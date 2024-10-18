import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-profil-commercant',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profil-commercant.component.html',
  styleUrl: './profil-commercant.component.css'
})
export class ProfilCommercantComponent implements OnInit {
  urlImg = "https://127.0.0.1:8000/images/";
  userInfo: any = null;

  authService = inject(AuthService)

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur connecté (décodé depuis le token)
    const userId = this.authService.decodedToken ? this.authService.decodedToken.id : null;

    if (userId !== null) {
      // Appeler la méthode pour récupérer les informations de l'utilisateur
      this.authService.getUserById(userId).subscribe(
        (data) => {
          this.userInfo = data;
          console.log('Informations de l\'utilisateur :', this.userInfo);
        },
        (error) => {
          console.error('Erreur lors de la récupération des informations de l\'utilisateur', error);
        }
      );
    }
  }
}
