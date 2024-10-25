import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../auth/auth.service';
import { CommandeService } from '../../../services/commande.service';
import User from '../../../models/user.model';
import { Observable } from 'rxjs';
import Commande from '../../../models/command.model';
import ProduitCommande from '../../../models/produitCommande.mode';

// Déclaration du composant UserCart
@Component({
  selector: 'app-user-cart', // Sélecteur du composant
  standalone: true, // Indique que ce composant est autonome
  imports: [CommonModule, RouterLink], // Modules importés
  templateUrl: './user-cart.component.html', // Chemin vers le template HTML
  styleUrls: ['./user-cart.component.css'] // Chemin vers les styles CSS
})
export class UserCartComponent implements OnInit {
  cartItems: any[] = []; // Liste des articles dans le panier
  commercants: User[] = []; // Liste des commerçants
  urlImg = "https://127.0.0.1:8000/images/"; // URL de base pour les images
  message: string = ''; // Message à afficher pour l'utilisateur
  messageType: 'success' | 'error' = 'success'; // Type de message (succès ou erreur)

  constructor(
    private userService: UserService, // Service pour les utilisateurs
    private authService: AuthService, // Service pour l'authentification
    private router: Router, // Service pour la navigation
    private commandeService: CommandeService // Service pour les commandes
  ) {}

  // Récupère les articles du panier stockés dans le localStorage
  getCartItems(): any[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  // Calcule le nombre total d'articles dans le panier
  getTotalItems(): number {
    const cart = this.getCartItems(); // Récupère les articles du panier
    return cart.reduce((sum: number, item: any) => sum + item.quantity, 0); // Somme les quantités
  }

  // Calcule le prix total des articles dans le panier
  getTotalPrice(): string {
    const totalPrice = this.cartItems.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity); // Prix total = somme des prix multipliés par les quantités
    }, 0);
    return totalPrice.toFixed(2) + ' €'; // Retourne le prix formaté avec deux décimales
  }

  // Vide le panier en supprimant les articles du localStorage
  clearCart(): void {
    localStorage.removeItem('cart'); // Supprime le panier du localStorage
    this.cartItems = []; // Réinitialise la liste des articles du panier
  }

  // Supprime un article spécifique du panier
  removeFromCart(item: any): void {
    const cart = this.getCartItems(); // Récupère les articles du panier
    const index = cart.findIndex((ci: any) => ci.id === item.id); // Trouve l'index de l'article à supprimer
    if (index !== -1) {
      cart.splice(index, 1); // Supprime l'article du panier
      this.cartItems = cart; // Met à jour la liste des articles du panier
      localStorage.setItem('cart', JSON.stringify(cart)); // Enregistre le panier mis à jour
    }
  }

  // Met à jour la quantité d'un article dans le panier
  updateCartItem(item: any, event: any): void {
    const target = event.target as HTMLSelectElement; // Cible l'élément HTML du changement d'événement
    const selectedQuantity = Number(target.value); // Récupère la quantité sélectionnée
    const cart = this.getCartItems(); // Récupère les articles du panier
    const index = cart.findIndex((ci: any) => ci.id === item.id); // Trouve l'index de l'article à mettre à jour
    if (index !== -1) {
      cart[index].quantity = selectedQuantity; // Met à jour la quantité de l'article
      this.cartItems = cart; // Met à jour la liste des articles du panier
      localStorage.setItem('cart', JSON.stringify(cart)); // Enregistre le panier mis à jour
    }
  }

  // Calcule le prix total d'un commerçant spécifique
  getTotalPriceByMerchant(commercantId: string): string {
    const items = this.cartItems.filter(item => item.commercant === commercantId); // Filtre les articles par commerçant
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0); // Calcule le prix total
    return totalPrice.toFixed(2) + ' €'; // Retourne le prix formaté
  }

  // Calcule le nombre total d'articles d'un commerçant spécifique
  getTotalItemByMerchant(commercantId: string): string {
    const items = this.cartItems.filter(item => item.commercant === commercantId); // Filtre les articles par commerçant
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0); // Calcule le nombre total d'articles
    return totalItems.toString(); // Retourne le total sous forme de chaîne
  }

  // Récupère les commerçants uniques présents dans le panier
  getUniqueCommercants(): void {
    const cart = this.getCartItems(); // Récupère les articles du panier
    const commercantIds = new Set<number>(); // Utilise un Set pour obtenir des IDs uniques

    cart.forEach((cartItem: any) => {
      commercantIds.add(cartItem.commercant); // Ajoute chaque ID de commerçant au Set
    });

    this.commercants = []; // Réinitialise la liste des commerçants
    commercantIds.forEach((id) => {
      this.fetchCommercantInfo(id).subscribe((info) => {
        this.commercants.push(info); // Ajoute les informations du commerçant à la liste
      }, error => {
        // Gestion des erreurs lors de la récupération des informations du commerçant
      });
    });
  }

  // Récupère les informations d'un commerçant par son ID
  fetchCommercantInfo(commercantId: number): Observable<User> {
    return this.userService.getUserProfile(commercantId); // Appel au service utilisateur
  }

  // Crée une nouvelle commande à partir des articles du panier
  newCommande(): void {
    if (!this.authService.isLoggedIn()) { // Vérifie si l'utilisateur est connecté
      this.router.navigate(['/login']); // Redirige vers la page de connexion si non connecté
      return;
    }

    const userId = this.authService.getUserId(); // Récupère l'ID de l'utilisateur
    if (!userId) {
      return; // Arrête l'exécution si l'ID utilisateur est introuvable
    }

    const cart = this.getCartItems(); // Récupère les articles du panier
    const groupedItems = this.groupItemsByMerchant(cart); // Regroupe les articles par commerçant
    const totalOrders = Object.keys(groupedItems).length; // Compte le nombre total de commandes
    let successfulOrders = 0; // Compteur pour les commandes réussies

    for (const [merchantId, items] of Object.entries(groupedItems)) {
      this.fetchCommercantInfo(+merchantId).subscribe(merchantInfo => {
        this.userService.getUserProfile(userId).subscribe(userInfo => {
          const produits_commande: ProduitCommande[] = items.map(item => ({
            productId: item.id,
            quantity: item.quantity // Crée un tableau des produits commandés
          }));

          const produits = items.map(item => ({
            id: item.id,
            productName: item.name,
            description: item.description,
            prix: item.price,
            stock: item.stock,
            imageFileName: item.imageFileName,
            userProduct: item.user,
            format: item.format // Crée un tableau des produits avec les détails
          }));

          const UserCommande = [
            userInfo, // Informations de l'utilisateur client
            merchantInfo // Informations du commerçant
          ];

          const orderData: Commande = {
            produits_commande: produits_commande,
            etat: { id: 1, name: 'En attente' }, // État de la commande initial
            UserCommande: UserCommande,
            produits: produits // Informations sur les produits
          };

          // Appel à la méthode pour créer la commande
          this.createOrder(orderData).subscribe(
            response => {
              successfulOrders++; // Incrémente le compteur de commandes réussies
              this.message = 'Commande créée avec succès !'; // Message de réussite
              
              // Vérifie si toutes les commandes ont réussi
              if (successfulOrders === totalOrders) {
                this.clearCart(); // Vide le panier uniquement si toutes les commandes ont réussi
              }
            },
            error => {
              this.message = 'Erreur lors de la création de la commande. Veuillez réessayer.'; // Message d'échec
            }
          );
        }, error => {
          this.message = 'Erreur lors de la récupération des informations du client. Veuillez réessayer.'; // Message d'échec
        });
      }, error => {
        this.message = 'Erreur lors de la récupération des informations du commerçant. Veuillez réessayer.'; // Message d'échec
      });
    }
  }

  // Regroupe les articles par commerçant
  groupItemsByMerchant(cart: any[]): { [key: string]: any[] } {
    return cart.reduce((acc: { [key: string]: any[] }, item) => {
      if (!acc[item.commercant]) {
        acc[item.commercant] = []; // Initialise un tableau pour chaque commerçant
      }
      acc[item.commercant].push(item); // Ajoute l'article au tableau du commerçant correspondant
      return acc;
    }, {});
  }

  // Crée une commande en appelant le service de commande
  createOrder(orderData: Commande): Observable<Commande> {
    return this.commandeService.createCommande(orderData); // Appel au service de commande
  }

  // Méthode d'initialisation du composant
  ngOnInit(): void {
    const cart = this.getCartItems(); // Récupère les articles du panier
    this.cartItems = cart; // Met à jour la liste des articles dans le composant
    this.getUniqueCommercants(); // Récupère les commerçants uniques dans le panier
  }
}
