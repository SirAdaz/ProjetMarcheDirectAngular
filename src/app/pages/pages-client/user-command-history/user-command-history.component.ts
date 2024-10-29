import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Commande from '../../../models/command.model';
import User from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-command-history',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user-command-history.component.html',
  styleUrls: ['./user-command-history.component.css']
})
export class UserCommandHistoryComponent implements OnInit {
  user: User | undefined;
  commands: Commande[] = []; // Liste des commandes

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id')); // Récupère l'id

    // Récupère les infos du user
    this.userService.getUserProfile(userId).subscribe((data: User) => {
      this.user = data;
    });
    this.userService.getUserCommands(userId).subscribe((data: Commande[]) => {
      this.commands = data; // Stocke les commandes du user
    });
  }
}