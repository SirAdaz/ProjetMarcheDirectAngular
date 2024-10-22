// Service pour le User
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { command } from '../models/command.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:8000/api/users';
  constructor(private http: HttpClient) { }

  getUserProfileTest(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Méthode pour récupérer le profil utilisateur
  getUserProfile(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }


  // Méthode pour récupérer l'historique des commandes d'un utilisateur
  getUserCommands(userId: number): Observable<command[]> {
    return this.http.get<command[]>(`${this.apiUrl}/${userId}/user/command-history/:id`);
  }
}