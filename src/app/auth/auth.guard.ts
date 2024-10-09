import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const AuthGuard = () => {

  // Vérifie si l'utilisateur est connecté en utilisant le service AuthService
  const isLoggedIn = inject(AuthService).isLoggedIn()
  // Vérifie si l'utilisateur a des roles spécifiques en utilisant le service AuthService
  const getRoleAdmin = inject(AuthService).getRoles("ROLE_ADMIN")
  const getRoleCommercant = inject(AuthService).getRoles("ROLE_COMMERCIANT")
  const getRoleUser = inject(AuthService).getRoles("ROLE_USER")

  // Injection du service Router pour la navigation
  const router = inject(Router)

  // Si l'utilisateur est connecté et possède le rôle "ROLE_ADMIN"
  if (isLoggedIn && getRoleAdmin) {
    return true; // Accès autorisé
  } else {
    // Si l'utilisateur n'est pas connecté et ne possède pas le rôle requis, redirection vers la page de connexion
    router.navigateByUrl('/login');
    return false; // Accès refusé
  }
};
