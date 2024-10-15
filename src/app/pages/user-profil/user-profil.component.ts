import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
  user: User | undefined;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id']; // Récupèrer l'ID de l'utilisateur depuis l'url
    this.userService.getUserProfile(userId).subscribe(
      (data: User) => {
        this.user = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations de l’utilisateur', error);
      }
    );
  }
}
