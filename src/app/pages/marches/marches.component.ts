import { Component } from '@angular/core';
import Marche from '../../models/marche.model';
import { MarchesService } from '../../services/marches.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-marches',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './marches.component.html',
  styleUrl: './marches.component.css'
})
export class MarchesComponent 
{
  marches!: Marche[]
  i=1;
  urlImg = "https://127.0.0.1:8000/images/";

  constructor(private marchesServices: MarchesService) {}

  public getMarchesOtherPagesMoins(): void { // Méthode pour récupérer les autres pages des books
    this.i = this.i-1;
    if (this.i < 1) {
      this.i = 1;
    }
    this.marchesServices.getMarchesOtherPages(this.i).subscribe((data) => { this.marches = data})
  }
  
  public getMarchesOtherPagesPlus(): void { // Méthode pour récupérer les autres pages des books
    this.marchesServices.getMarchesOtherPages(this.i + 1).subscribe((data) => {
      if (data && data.length > 0) { // Vérifie s'il y a des données sur la page suivante
        this.i = this.i + 1;
        this.marches = data;
      }
    });
  }

  ngOnInit(): void {
    this.marchesServices.getMarches().subscribe((data) => {this.marches = data});
  }
}
