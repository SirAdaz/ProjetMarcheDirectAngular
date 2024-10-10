import { Component, OnInit } from '@angular/core';
import Marche from '../../models/marche.model';
import { MarchesService } from '../../services/marches.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilGlobalComponent implements OnInit
{
  marches !: Marche[]

  constructor(private marchesServices: MarchesService) {}

  ngOnInit(): void {
    this.marchesServices.getMarches().subscribe((response) => {
      if (Array.isArray(response.member)) {
        this.marches = response.member;
        console.log(this.marches);
      } else {
        console.error('La propriété "member" n\'est pas un tableau :', response.member);
      }
    });
  }
}
