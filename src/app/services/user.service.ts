// Service pour le User
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; 
import { command } from '../models/command.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/users'; 

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer le profil utilisateur
  getUserProfile(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  // Méthode pour récupérer l'historique des commandes d'un utilisateur
  getUserCommands(userId: number): Observable<command[]> {
    return this.http.get<command[]>(`${this.apiUrl}/${userId}/commands`);
  }
}
