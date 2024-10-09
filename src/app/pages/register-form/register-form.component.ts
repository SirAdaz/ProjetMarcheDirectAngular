import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
      // Service d'authentification injecté pour les opérations d'inscription
      auth = inject(AuthService); 
      // Routeur injecté pour la navigation
      router = inject(Router);
    
    
      submitted :boolean = false; // Indicateur pour soumission du formulaire
      message: boolean = false; // Indicateur pour l'affichage d'un message
    
      // Formulaire d'inscription protégé par le formulaire réactif
      public registerForm = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
      })
    
      private addUser(): void {
        this.auth.signup(this.registerForm.value).subscribe((data: any) => {
          console.log(data);
          this.router.navigate(['/login']);
        });
        this.registerForm.reset(); // Réinitialise le formulaire après soumission
        this.submitted = false; // Réinitialise l'indicateur de soumission
      }
    
      // Méthode appelée à la soumission du formulaire
      public onSubmit() {
        this.submitted = true; // Marque le formulaire comme soumis
        if (this.registerForm.valid) { // Vérifie si le formulaire est valide
          this.message = true; // Affiche un message si le formulaire est valide
          this.addUser(); // Appelle la méthode pour ajouter un auteur
        }
      }
  }
