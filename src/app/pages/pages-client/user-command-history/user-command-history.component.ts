import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import User from '../../../models/user.model';

@Component({
  selector: 'app-user-command-history',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user-command-history.component.html',
  styleUrls: ['./user-command-history.component.css']
})
export class UserCommandHistoryComponent implements OnInit {
  user: User | undefined;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    }

}