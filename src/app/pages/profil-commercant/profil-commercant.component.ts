import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profil-commercant',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profil-commercant.component.html',
  styleUrl: './profil-commercant.component.css'
})
export class ProfilCommercantComponent {

  user!: User;
  urlImg = "https://127.0.0.1:8000/images/";
  userServices = inject(UserService);

  route = inject(ActivatedRoute);
  router = inject(Router);

}
