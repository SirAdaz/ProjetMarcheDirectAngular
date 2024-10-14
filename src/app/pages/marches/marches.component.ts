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
  marches !: Marche[]

  constructor(private marchesServices: MarchesService) {}

  ngOnInit(): void {
    this.marchesServices.getMarches().subscribe((data) => {this.marches = data});
  }
}
