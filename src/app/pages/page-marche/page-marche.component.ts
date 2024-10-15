import { Component, inject, OnInit } from '@angular/core';
import Marche from '../../models/marche.model';
import { MarchesService } from '../../services/marches.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-marche',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-marche.component.html',
  styleUrl: './page-marche.component.css'
})
export class PageMarcheComponent implements OnInit
{
  marche !: Marche;

  urlImg = "https://127.0.0.1:8000/images/";

  marcheServices = inject(MarchesService)
  //permet de récup l'id
  route = inject(ActivatedRoute)
  //permet la redirection de la route
  router = inject(Router)

  private subscribeMarche(id:number) 
  {
    this.marcheServices.getMarche(id).subscribe((data)=> (this.marche = data, console.log(data)))
  }

  private setSubscribe(id: string | null) 
  {
    if (id) 
    {
      this.subscribeMarche(+id)  
    }
  }

  ngOnInit(): void 
  {
    const id = this.route.snapshot.paramMap.get('id');
    this.setSubscribe(id);
  }
}
