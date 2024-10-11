import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { command } from '../../models/command.model';

@Component({
  selector: 'app-user-command-history',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user-command-history.component.html',
  styleUrls: ['./user-command-history.component.css']
})
export class UserCommandHistoryComponent implements OnInit {
  userId: number = 1; // Exemple de user
  commands: command[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserCommands(this.userId).subscribe(
      (data) => {
        this.commands = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des commandes du user:', error);
      }
    );
  }
}
