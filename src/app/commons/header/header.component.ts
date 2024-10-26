import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import User from '../../models/user.model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent   
{  
  user !: User;
  urlImg = "https://127.0.0.1:8000/images/";
  searchForm: FormControl;
  searchResults: any[] = []; // Stocker les résultats de recherche

  constructor(private searchService: SearchService, private router: Router, private authService: AuthService) {
    this.searchForm = new FormControl();

    // Observateur de la saisie utilisateur
    this.searchForm.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((term: string) => this.search(term));
  }

// Méthode pour lancer la recherche
search(term: string) {
  if (term) {
    console.log(`Recherche de : ${term}`);
    
    // Exécuter la recherche
    this.searchService.search(term).subscribe({
      next: (results) => {
        this.searchResults = [
          ...results.produits, 
          ...results.marches, 
          ...results.commercants
        ]; // Stocker les résultats
        
        // Rediriger vers la même page avec des paramètres de recherche
        this.router.navigate([], {
          queryParams: { searchTerm: term },
          queryParamsHandling: 'merge' // Ajoute le terme de recherche aux paramètres existants
        });

      },
      error: (error) => {
        console.error('Erreur lors de la recherche', error);
      }
    });
  } else {
    this.searchResults = []; // Réinitialiser les résultats si le terme est vide
  }
}

// Méthode pour naviguer vers le résultat sélectionné
navigateToResult(id: number) {
  const produit = this.searchResults.find(r => r.id === id && r.productName);
  if (produit) {
    const commercantId = produit.userProductId;
    
    const url = this.router.createUrlTree(['/marchants', commercantId]);
    this.router.navigateByUrl(url); // Utiliser navigateByUrl pour forcer le rechargement
    return;
  }

  const marche = this.searchResults.find(r => r.id === id && r.marcheName);
  if (marche) {
    const url = this.router.createUrlTree(['/marches', marche.id]);
    this.router.navigateByUrl(url); // Utiliser navigateByUrl pour forcer le rechargement
    return;
  }

  const commercant = this.searchResults.find(r => r.id === id && r.nameBusiness);
  if (commercant) {
    const url = this.router.createUrlTree(['/marchants', commercant.id]);
    this.router.navigateByUrl(url); // Utiliser navigateByUrl pour forcer le rechargement
  }
}
    public logout()
    {
      this.authService.logout();
      this.router.navigate(['login']);
    }
    isLoggedIn() 
    {
      return localStorage.getItem('isAuthenticated') === 'true';
    }
    isCommerceAccueil() : boolean
    {
        return this.router.url === '/commerce/accueil';
    }
}
