// Service pour le User
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Commande from '../models/command.model';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:8000/api/users';
  private commandUrl = 'https://localhost:8000/api/commandes';
  private shortApiUrl = 'https://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getUserProfileTest(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Méthode pour récupérer le profil utilisateur
  getUserProfile(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  // Méthode pour récupérer l'historique des commandes d'un utilisateur
  getUserCommands(userId: number): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.commandUrl}/${userId}/user/command-history/:id`);
  }

  // Méthode pour mettre à jour l'image de l'utilisateur
  uploadImage(id: number,formData: FormData): Observable<any> {
    return this.http.post(`${this.shortApiUrl}/upload/${id}`, formData);
  }
  updateUserProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user,{
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }); 
  }
}