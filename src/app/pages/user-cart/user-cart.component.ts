// import { Component, OnInit } from '@angular/core';
// import { CartItem } from '../../models/cart.model';
// import { CartService } from '../../services/cart.service';
// import { RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-user-cart',
//   standalone: true,
//   imports: [CommonModule, RouterLink],
//   templateUrl: './user-cart.component.html',
//   styleUrl: './user-cart.component.css'
// })
// export class UserCartComponent implements OnInit {
//   cartItems: CartItem[] = [];

//   constructor(private cartService: CartService) {}

//   ngOnInit(): void {
//     // Récupération des produits depuis le service
//     this.cartService.getCartItems().subscribe((items) => {
//       this.cartItems = items;
//     });
//   }
//   getTotalItems(): number {
//     // Calcul du nombre total de produits dans le panier
//     return this.cartItems.reduce((total, item) => total + item.quantity, 0);
//   }
  
//   getTotalPrice(): number {
//     // Calcul du prix total des produits dans le panier
//     return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   }
  

//   clearCart(): void {
//     // Suppression des produits du panier
//     this.cartService.clearCart();
//   }
// }