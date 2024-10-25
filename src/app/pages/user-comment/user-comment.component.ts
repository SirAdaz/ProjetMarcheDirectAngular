import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Comment } from '../../models/comment.model';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-user-comment',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-comment.component.html',
  styleUrl: './user-comment.component.css'
})
export class UserCommentComponent {
  comments: Comment[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    // Méthode qui récupère l'ID de l'utilisateur connecté
    const userId = 1;
    this.commentService.getCommentsByUserId(userId).subscribe((data) => {
      this.comments = data;
    });
  }
}
