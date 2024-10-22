import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { NgIf } from '@angular/common';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profil-commercant',
  standalone: true,
  imports: [ReactiveFormsModule, DateFormatPipe, NgIf],
  templateUrl: './profil-commercant.component.html',
  styleUrl: './profil-commercant.component.css'
})
export class ProfilCommercantComponent implements OnInit {
  urlImg = "https://127.0.0.1:8000/images/";
  selectedFile: File | null = null;
  userInfo: any = null;
  selectedItem: any;

  authService = inject(AuthService)
  userService = inject(UserService)

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

  // Méthode pour capturer le fichier sélectionné
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0]; // Récupère le fichier sélectionné
  }

  openModal() {
    const modalElement = document.getElementById('modifImage');
    const modal = new (window as any).bootstrap.Modal(modalElement);  // Utiliser Bootstrap via CDN
    modal.show();
  }

  // Méthode pour envoyer l'image au backend
  modifImage(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile); // Ajouter le fichier sélectionné au formData

      // Appeler le service pour envoyer le fichier au backend
      this.userService.updateUserImage(this.userInfo.id, formData, this.selectedItem).subscribe(
        (response) => {
          console.log('Image mise à jour avec succès !', response);
        },
        (error) => {
          console.error('Erreur lors de l\'upload de l\'image', error);
        }
      );
    } else {
      console.error('Aucun fichier sélectionné.');
    }
  }

  onUpdateImage() {
    if (this.selectedFile) {
      this.modifImage(); // Appeler la méthode pour uploader l'image
    } else {
      console.error('Aucun fichier sélectionné pour la mise à jour.');
    }
  }

}
