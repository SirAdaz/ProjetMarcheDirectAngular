import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarchésService 
{
  private urlApi = "http://127.0.0.1:8000/api"
  constructor(private http: HttpClient) { }
  
}
