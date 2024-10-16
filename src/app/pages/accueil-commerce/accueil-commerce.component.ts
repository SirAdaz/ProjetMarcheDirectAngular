import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-accueil-commerce',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './accueil-commerce.component.html',
  styleUrl: './accueil-commerce.component.css'
})
export class AccueilCommerceComponent implements OnInit {
  userId: string | null = null;
  user: User | null = null; 

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id'); // Récupération de l'ID en tant que string

      if (this.userId !== null) {
        const userIdNumber = +this.userId; // Conversion de l'ID en nombre
        if (this.authService.getId(userIdNumber)) {
          // Vérifier si l'utilisateur a le droit d'accéder à ce profil
          this.userService.getUserById(userIdNumber).subscribe({
            next: (data: User) => {
              this.user = data; // Stockez les données de l'utilisateur
            },
            error: (err) => {
              console.error('Erreur lors du chargement des données utilisateur:', err);
              // Optionnel : gérer l'erreur (par exemple, afficher un message d'erreur)
            }
          });
        } else {
          console.log('L\'utilisateur n\'a pas l\'autorisation d\'accéder à ce profil.');
          // Optionnel : rediriger vers une page d'erreur ou d'accès non autorisé
          this.router.navigate(['/unauthorized']); // Redirection
        }
      } else {
        console.log('ID utilisateur non valide.');
        console.log(this.userId);
        // Optionnel : rediriger ou afficher un message d'erreur
      }
    });
  }
}