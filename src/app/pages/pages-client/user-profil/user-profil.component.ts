import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD:src/app/pages/user-profil/user-profil.component.ts
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
=======
import { ActivatedRoute } from '@angular/router';
import { RouterLink, RouterModule } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
>>>>>>> 873f078ed79505cd788d28150bd08bfd10855d66:src/app/pages/pages-client/user-profil/user-profil.component.ts

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
  user: User | undefined;

  constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
<<<<<<< HEAD:src/app/pages/user-profil/user-profil.component.ts
    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUserProfile(userId).subscribe(
        (userData) => {
          this.user = userData;
        },
        (error) => {
          console.error('Erreur lors de la récupération des informations utilisateur:', error);
        }
      );
    } else {
      console.error('ID utilisateur non trouvé');
    }
=======
    const userId = this.route.snapshot.params['id']; // Récupèrer l'ID de l'utilisateur depuis l'url
    this.userService.getUserProfile(userId).subscribe(
      (data: User) => {
        this.user = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur', error);
      }
    );
>>>>>>> 873f078ed79505cd788d28150bd08bfd10855d66:src/app/pages/pages-client/user-profil/user-profil.component.ts
  }
  
}
