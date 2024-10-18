import { Component, SimpleChanges } from '@angular/core';
import { ProduitsService } from '../../services/produits.service';
import Produit from '../../models/produit.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css'
})
export class ProduitsComponent {
  // Tableau pour stocker la liste complète des produits
  maxProduits!: Produit[];
  // Tableau pour stocker les produits de la page actuelle
  produits!: Produit[];
  // Index de la page actuelle, initialisé à 1
  i = 1;
  // URL de base pour les images
  urlImg = "https://127.0.0.1:8000/images/";
  // Références aux boutons de pagination 'précédent' et 'suivant'
  btnPrecedent!: HTMLElement | null;
  btnSuivant!: HTMLElement | null;
  // Tableau pour stocker le panier
  cartItems: any[] = [];

  // Quantité sélectionnée pour gérer le prix dans la modal
  selectedQuantity: number = 1;

  // Injection du service ProduitsService pour communiquer avec l'API backend
  constructor(private ProduitsServices: ProduitsService) {}

  // Supprimer les balises HTML de la description
  removeDivTags(text: string): string {
    return text.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, ' ');
  }

  // Fonction pour multiplier le prix en fonction de la quantité sélectionnée
  changePrice(event: any) {
    const target = event.target as HTMLSelectElement;
    if (target !== null) {
      this.selectedQuantity = Number(target.value);
    }
  }

  // Fonction pour ajouter un produit au panier
  addToCart(item: Produit) {
    const cartItem = {
      id: item.id,
      quantity: this.selectedQuantity,
      price: item.prix,
      imageFileName: item.imageFileName,
      productName: item.productName
    };

    // Récupérer le panier existant depuis le local storage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Vérifier si l'article existe déjà dans le panier et mettre à jour sa quantité
    const existingItemIndex = cart.findIndex((ci: any) => ci.id === cartItem.id);
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += cartItem.quantity;
    } else {
      // Sinon, ajouter le nouvel article au panier
      cart.push(cartItem);
    }

    // Enregistrer le nouveau panier dans le local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mettre à jour les articles du panier
    this.cartItems = cart;
  }

  // Mettre à jour la quantité d'un produit dans le panier
  updateCartItem(item: Produit, event: any) {
    const target = event.target as HTMLSelectElement;
    const selectedQuantity = Number(target.value);

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const index = cart.findIndex((ci: any) => ci.id === item.id);
    if (index !== -1) {
      cart[index].quantity = selectedQuantity;
      this.cartItems = cart;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  // Fonction pour obtenir le nombre total d'articles dans le panier
  getTotalItems(): number {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
  }

  // Fonction pour obtenir le prix total des articles dans le panier
  getTotalPrice(): string {
    const totalPrice = this.cartItems.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity);
    }, 0);
    return totalPrice.toFixed(2) + ' €';
  }
  
  // Fonction pour vider le panier dans le local storage
  clearCart(): void {
    // Supprimer le panier dans le local storage
    localStorage.removeItem('cart');
    // Réinitialiser le tableau des articles du panier
    this.cartItems = []
  }
    
  // Fonction pour retirer un produit du panier
  removeFromCart(item: any): void {
    // Récupérer le panier existant depuis le local storage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Trouver l'index de l'article à supprimer
    const index = cart.findIndex((ci: any) => ci.id === item.id);
    
    // Vérifier si l'article existe dans le panier
    if (index !== -1) {
      // Si oui, le supprimer du panier
      cart.splice(index, 1);
    
      // Mettre à jour le tableau des articles du panier
      this.cartItems = cart;
    
      // Enregistrer le panier mis à jour dans le local storage
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
  
  // Appelé après l'initialisation de la vue
  ngAfterViewInit(): void {
    // Obtenir des références aux boutons de pagination
    this.btnPrecedent = document.getElementById("btn-precedent");
    this.btnSuivant = document.getElementById("btn-suivant");
    // Mettre à jour la visibilité des boutons en fonction de la page actuelle
    this.updateButtonVisibility();
  }

  // Récupérer la page précédente des produits
  public getOtherPagesMoins(): void {
    if (this.i > 1) { // S'assurer de ne pas être à la première page
      this.i = this.i - 1; // Décrémenter l'index de la page
      this.ProduitsServices.getOtherPages(this.i).subscribe((data) => {
        // Mettre à jour les données des produits et rafraîchir la visibilité des boutons
        this.produits = data;
        this.updateButtonVisibility();
      });
    }
  }
  
  // Récupérer la page suivante des produits
  public getOtherPagesPlus(): void {
    this.ProduitsServices.getOtherPages(this.i + 1).subscribe((data) => {
      if (data && data.length > 0) { // S'assurer que des données existent
        this.i = this.i + 1; // Incrémenter l'index de la page
        this.produits = data;
        this.updateButtonVisibility();
      }
    });
  }
  
  // Logique d'initialisation pour le composant, charge les données initiales des produits
  ngOnInit(): void {
    this.ProduitsServices.getProduits().subscribe((data) => {
      // Définir les données initiales des produits
      this.produits = data;
      // Mettre à jour la visibilité des boutons en fonction des données initiales
      this.updateButtonVisibility();
    });

    // Récupérer et définir les articles du panier depuis le local storage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems = cart;
  }

  // Ajuster la visibilité des boutons de pagination en fonction de la page actuelle
  private updateButtonVisibility(): void {
    if (this.btnPrecedent) {
      // Masquer le bouton précédent sur la première page
      this.btnPrecedent!.style.display = this.i === 1 ? "none" : "block";
    }

    if (this.btnSuivant) {
      // Déterminer la visibilité du bouton suivant en vérifiant si les données de la page suivante existent
      this.ProduitsServices.getOtherPages(this.i + 1).subscribe((data) => {
        this.btnSuivant!.style.display = data && data.length > 0 ? "block" : "none";
      });
    }
  }
}