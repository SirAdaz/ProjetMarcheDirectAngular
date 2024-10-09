import { Routes } from '@angular/router';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { AccueilGlobalComponent } from './pages/accueilGlobal/accueil.component';

export const routes: Routes = 
[
    {path: 'login', component:LoginFormComponent},
    {path: 'accueilGlobal', component:AccueilGlobalComponent}
];
