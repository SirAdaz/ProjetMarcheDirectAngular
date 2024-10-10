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
  marches !: Marche[]

  constructor(private marchesServices: MarchesService) {}

  ngOnInit(): void {
    this.marchesServices.getMarches().subscribe((response) => {
      if (Array.isArray(response.member)) {
        this.marches = response.member;
      } else {
        console.error('La propriété "member" n\'est pas un tableau :', response.member);
      }
    });
  }
}
