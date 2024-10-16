import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-accueil-commerce',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './accueil-commerce.component.html',
  styleUrl: './accueil-commerce.component.css'
})
export class AccueilCommerceComponent {
  loggedIn: any;

  constructor(public auth: AuthService){}

  ngOnInit(): void {
    this.loggedIn = this.auth.isLoggedIn();
  }
}
