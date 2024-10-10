import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Marche from '../models/marche.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarchesService 
{
  private urlApi = "http://127.0.0.1:8000/api"
  constructor(private http: HttpClient) { }

  getMarches():Observable<{member:Marche[]}>
  {
    return this.http.get<{member:Marche[]}>(`${this.urlApi}/marches`)
  }        

}
