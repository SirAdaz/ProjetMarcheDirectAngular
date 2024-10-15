import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-accueil-commerce',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './accueil-commerce.component.html',
  styleUrl: './accueil-commerce.component.css'
})
export class AccueilCommerceComponent implements OnInit {
  userProfile: any;

  constructor(private userService: UserService) { }

ngOnInit(): void {
  this.userService.getUserProfileTest().subscribe(
    data => {
      this.userProfile = data;
    },
    error => {
      console.error('Erreur lors de la récupération des données du profil', error);
    }
  );
}
}
