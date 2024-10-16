import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlApi = "https://localhost:8000";
  token = "";
  decodedToken: any = null;

  constructor(private http: HttpClient) {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      this.setToken(storedToken);
    }
  }

  signup(data: any) {
    return this.http.post(`${this.urlApi}/register`, data)
  }

  login(data: any) {
    return this.http.post<{ token: string }>(`${this.urlApi}/api/login_check`, data).pipe(
      tap(response => {
        this.setToken(response.token);
      })
    );
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
    this.decodedToken = jwtDecode(token);
  }

  getToken() {
    return this.token;
  }

  logout() {
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('authToken');
    this.token = "";
    this.decodedToken = null;
  }

  isLoggedIn() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  decodeToken(): any {
    const token = this.getToken()
    if (token) {
      return jwtDecode(token);
    }
    return null
  }

  // Méthode pour vérifier si un utilisateur possède un rôle spécifique
  getRoles(value: string): boolean {
    // Vérifie si le token décodé existe et si l'utilisateur possède le rôle spécifié
    if (this.decodedToken) {
      return this.decodedToken.roles.some((role: string) => role === value)
    }
    // Retourne false si le token décodé n'existe pas ou si l'utilisateur ne possède pas le rôle spécifié
    return false
  }
}
