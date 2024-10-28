import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

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
  }
  
}
