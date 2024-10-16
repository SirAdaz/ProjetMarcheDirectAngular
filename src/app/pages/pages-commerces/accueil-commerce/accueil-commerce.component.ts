import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-accueil-commerce',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './accueil-commerce.component.html',
  styleUrl: './accueil-commerce.component.css'
})
export class AccueilCommerceComponent{

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Remplacez 123 par l'ID que vous voulez vérifier
    const testId = 12;
    const hasId = this.authService.getId(testId);

    console.log('L\'utilisateur connecté a-t-il l\'ID', testId, '? :', hasId);
  }
}