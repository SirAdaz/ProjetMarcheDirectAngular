import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent 
{ 
    authService = inject(AuthService);
    router = inject(Router);
    public logout()
    {
      this.authService.logout();
      this.router.navigate(['login']);
    }
    isLoggedIn() 
    {
      return localStorage.getItem('isAuthenticated') === 'true';
    }
    isCommerceAccueil() : boolean
    {
        return this.router.url === '/commerce/accueil';
    }
}
