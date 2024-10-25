import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../auth/auth.service';
import User from '../../../models/user.model';
import Produit from '../../../models/produit.model';
import Format from '../../../models/format.models';

@Component({
  selector: 'app-gestion-des-produits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-des-produits.component.html',
  styleUrl: './gestion-des-produits.component.css'
})

export class GestionDesProduitsComponent {
  urlImg = "https://127.0.0.1:8000/images/";
  user!: User;
  produits!: Produit[];
  format!: Format[];

  constructor(private userService: UserService, private authService: AuthService) { };

  ngOnInit(): void {
    const userId = this.authService.decodedToken ? this.authService.decodedToken.id : null;

    this.userService.getUserProfile(userId).subscribe((data) => {
      this.user = data;
      this.produits = this.user.produits;
      console.log(this.user);
    });
  };

  // Supprimer les balises HTML de la description
  removeDivTags(text: string): string {
    return text.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, ' ');
  }

}
