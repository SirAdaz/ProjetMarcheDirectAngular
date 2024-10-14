import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Marche from '../models/marche.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarchesService 
{
  private urlApi = "https://127.0.0.1:8000/api"
  constructor(private http: HttpClient) { }

  getMarchesMembre():Observable<{member:Marche[]}>
  {
    return this.http.get<{member:Marche[]}>(`${this.urlApi}/marches`)
  }
  
  getMachesAccueil():Observable<{member:Marche[]}>
  {
    return this.http.get<{member:Marche[]}>(`${this.urlApi}/marches?itemsPerPage=3`)
  }
  // Méthode pour récupérer les autres pages des auteurs
  getMarchesOtherPages(i: number): Observable<{member:Marche[]}> {
    return this.http.get<{member:Marche[]}>(`${this.urlApi}/marches?itemsPerPage=6&page=${i}`);
  }
}
