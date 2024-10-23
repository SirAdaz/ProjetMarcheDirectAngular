import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { NgIf } from '@angular/common';
import { UserService } from '../../../services/user.service';
declare var bootstrap: any;

@Component({
  selector: 'app-profil-commercant',
  standalone: true,
  imports: [ReactiveFormsModule, DateFormatPipe, NgIf],
  templateUrl: './profil-commercant.component.html',
  styleUrl: './profil-commercant.component.css'
})
export class ProfilCommercantComponent implements OnInit {
  urlImg = "https://127.0.0.1:8000/images/";
  userInfo: any;
  selectedFile: File | null = null;
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

  openModalModif(): void {
    const modalElement = document.getElementById('modifImage');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openModalInfo(): void {
    const modalElement = document.getElementById('modifInfo');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpdateImage(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.userService.uploadImage(this.authService.decodedToken.id, formData).subscribe({
        next: (response) => {
          console.log('Upload réussi', response);
          this.userInfo.imageFileName = response.filename;
          // Fermer la modal après la modification
          const modalElement = document.getElementById('modifImage');
          if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.hide();
          }
        },
        error: (error) => {
          console.error('Erreur lors de l\'upload', error);
        }
      });
    }
  }
}
