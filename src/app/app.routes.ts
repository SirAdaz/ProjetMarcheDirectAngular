import { Routes } from '@angular/router';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { AccueilCommerceComponent } from './pages/accueil-commerce/accueil-commerce.component';
import { AccueilGlobalComponent } from './pages/accueilGlobal/accueil.component';


export const routes: Routes = 
[
    {path: 'login', component:LoginFormComponent},
    {path: 'commerce/accueil', component:AccueilCommerceComponent},
    {path: 'accueilGlobal', component:AccueilGlobalComponent}
];
