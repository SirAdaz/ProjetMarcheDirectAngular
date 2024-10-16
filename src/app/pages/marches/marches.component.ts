
import { Component, AfterViewInit } from '@angular/core';
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
export class MarchesComponent implements AfterViewInit {
  marches!: Marche[];
  i = 1;
  urlImg = "https://127.0.0.1:8000/images/";
  btnPrecedent!: HTMLElement | null;
  btnSuivant!: HTMLElement | null;

  constructor(private marchesServices: MarchesService) {}

  ngAfterViewInit(): void {
    this.btnPrecedent = document.getElementById("btn-precedent");
    this.btnSuivant = document.getElementById("btn-suivant");
    this.updateButtonVisibility();
  }

  public getMarchesOtherPagesMoins(): void {
    if (this.i > 1) {
      this.i = this.i - 1;
      this.marchesServices.getMarchesOtherPages(this.i).subscribe((data) => {
        this.marches = data;
        this.updateButtonVisibility();
      });
    }
  }
  
  public getMarchesOtherPagesPlus(): void {
    this.marchesServices.getMarchesOtherPages(this.i + 1).subscribe((data) => {
      if (data && data.length > 0) {
        this.i = this.i + 1;
        this.marches = data;
        this.updateButtonVisibility();
      }
    });
  }
  
  ngOnInit(): void {
    this.marchesServices.getMarches().subscribe((data) => {
      this.marches = data;
      this.updateButtonVisibility();
    });
  }

  private updateButtonVisibility(): void {
    if (this.btnPrecedent) {
      this.btnPrecedent!.style.display = this.i === 1 ? "none" : "block";
    }

    if (this.btnSuivant) {
      this.marchesServices.getMarchesOtherPages(this.i + 1).subscribe((data) => {
        this.btnSuivant!.style.display = data && data.length > 0 ? "block" : "none";
      });
    }
  }
}
