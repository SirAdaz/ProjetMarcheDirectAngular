import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../auth/auth.service';
import { CommandeService } from '../../../services/commande.service';
import User from '../../../models/user.model';

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.css'
})
export class UserCartComponent implements OnInit{
  // Tableau pour stocker le panier
  cartItems: any[] = [];

  // Tableau pour stocker les commercants
  commercants: User[] = [];

  // URL de base pour les images
  urlImg = "https://127.0.0.1:8000/images/";

  constructor(private userService: UserService, private authService: AuthService, private router: Router, private commandeService: CommandeService) {}

  // Fonction pour recupérer les articles du panier depuis le local storage
  getCartItems(): any[] {
    return JSON.parse(localStorage.getItem('cart') || '[]'); // Récupération des articles du panier depuis le local storage
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

    totalOverallPrice(): string {
      const totalPrice = this.cartItems.reduce((sum: number, item: any) => {
        return sum + (item.price * item.quantity);
      }, 0);
      return totalPrice.toFixed(2);
    }

  // Mettre à jour la quantité d'un produit dans le panier
  updateCartItem(item: any, event: any) {
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

// fonction pour afficher les prix total par commercant
getTotalPriceByMerchant(commercantId: string): string {
  const items = this.cartItems.filter(item => item.commercant === commercantId);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return totalPrice.toFixed(2) + ' €';
}
// fonction pour afficher les articles par commercant
getTotalItemByMerchant(commercantId: string): string {
  const items = this.cartItems.filter(item => item.commercant === commercantId);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  return totalItems.toString();
}

getUniqueCommercants() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');

  // Utiliser un Set pour obtenir des IDs uniques de commerçants
  const commercantIds = new Set<number>();
  cart.forEach((cartItem: any) => {
    commercantIds.add(cartItem.commercant);
  });

  // Effacer les anciens commerçants si nécessaire
  this.commercants = [];

   // Récupérer les informations pour chaque ID unique de commerçant
    commercantIds.forEach((id) => {
      this.fetchCommercantInfo(id).subscribe((info) => {
        this.commercants.push(info);
        console.log('Commerçant ajouté : ', info);
        if (this.commercants.length > 0) {
          console.log(this.commercants[0]); // Afficher dès que le premier commerçant est ajouté
        }
      });
    });
}

  fetchCommercantInfo(commercantId: number) {
    // appeler un service qui récupère les informations du commerçant
    return this.userService.getUserProfile(commercantId);
  }

  // Création de la commande
  newCommande() {
    console.log('Commande button clicked');
  
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
  
    const userId = this.authService.getUserId();
    if (!userId) {
      return;
    }
  
  
    const cart = this.getCartItems();
  
    const groupedItems = this.groupItemsByMerchant(cart);
  
    for (const [merchantId, items] of Object.entries(groupedItems)) {
      const orderData = {
        userId,
        merchantId,
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };
      console.log('Creating order with data:', orderData);
      this.createOrder(orderData);
    }
  
    this.clearCart();
  }

  // Méthode pour grouper les articles par commercant
  groupItemsByMerchant(cart: any[]) {
    return cart.reduce((acc: { [key: string]: any[] }, item) => {
      if (!acc[item.commercant]) {
        acc[item.commercant] = [];
      }
      acc[item.commercant].push(item);
      return acc;
    }, {});
  }

  // Méthode pour créer une commande
  createOrder(orderData: any) {
    this.commandeService.createCommande(orderData).subscribe({
      next: (commande) => {
        console.log('Commande créée avec succès:', commande);
      },
      error: (error) => {
        console.error('Erreur lors de la création de la commande:', error);
      }
    });
  }

  ngOnInit(): void {
    // Récupérer et définir les articles du panier depuis le local storage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems = cart;
    this.getUniqueCommercants();
  }
}