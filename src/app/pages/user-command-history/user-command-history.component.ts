import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { command } from '../../models/command.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-command-history',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user-command-history.component.html',
  styleUrls: ['./user-command-history.component.css']
})
export class UserCommandHistoryComponent implements OnInit {
  commands: command[] = []; // Tableau pour stocker les commandes
  user: User | undefined;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id']; // Récupérer l'ID de l'utilisateur depuis l'URL
    this.userService.getUserCommands(userId).subscribe((data: command[]) => {
      this.commands = data; // Stocker les commandes dans le tableau
    },
    (error) => {
      console.error('Erreur lors de la récupération des commandes:', error);
      }
    );
  }
}