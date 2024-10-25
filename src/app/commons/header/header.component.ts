import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import User from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent 
{   
    user !: User;
    urlImg = "https://127.0.0.1:8000/images/";
    authService = inject(AuthService);
    router = inject(Router)

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
