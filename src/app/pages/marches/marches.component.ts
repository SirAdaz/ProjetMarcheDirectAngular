import { Component } from '@angular/core';
import Marche from '../../models/marche.model';
import { MarchesService } from '../../services/marches.service';

@Component({
  selector: 'app-marches',
  standalone: true,
  imports: [],
  templateUrl: './marches.component.html',
  styleUrl: './marches.component.css'
})
export class MarchesComponent 
{
  marches!: Marche[]
  i=1;

  constructor(private marchesServices: MarchesService) {}

  public getMarchesOtherPagesMoins(): void { // Méthode pour récupérer les autres pages des books
    this.i = this.i-1;
    if (this.i < 1) {
      this.i = 1;
    }
    this.marchesServices.getMarchesOtherPages(this.i).subscribe((data) => { this.marches = data.member })
  }
  
  public getMarchesOtherPagesPlus(): void { // Méthode pour récupérer les autres pages des books
    this.marchesServices.getMarchesOtherPages(this.i + 1).subscribe((data) => {
      if (data.member && data.member.length > 0) { // Vérifie s'il y a des données sur la page suivante
        this.i = this.i + 1;
        this.marches = data.member;
      }
    });
  }

  ngOnInit(): void {
    this.marchesServices.getMarchesMembre().subscribe((response) => {
      if (Array.isArray(response.member)) {
        this.marches = response.member;
      } else {
        console.error('La propriété "member" n\'est pas un tableau :', response.member);
      }
    });
}
}
