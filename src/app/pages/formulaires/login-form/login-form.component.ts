import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

    // Service d'authentification injecté pour les opérations de connexion
    auth = inject(AuthService); 
    // Routeur injecté pour la navigation
    router = inject(Router);
  
    // Formulaire de connexion protégé par le formulaire réactif
    protected loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
    // Méthode appelée à la soumission du formulaire
    onSubmit(){  
      if(this.loginForm.valid){
        this.auth.login(this.loginForm.value).subscribe((data: any) => {
          localStorage.setItem('isAuthenticated', 'true');
          this.auth.setToken("Bearer " + data.token);
          if(this.auth.isLoggedIn()){
            // Navigation vers la page '/admin' après une connexion réussie
            this.router.navigate(['admin']);
          }
        });
      }
    }
  }
