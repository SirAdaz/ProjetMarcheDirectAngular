import { Routes } from '@angular/router';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { AccueilCommerceComponent } from './pages/accueil-commerce/accueil-commerce.component';
import { AccueilGlobalComponent } from './pages/accueilGlobal/accueil.component';
import { ProfilCommercantComponent } from './pages/profil-commercant/profil-commercant.component';
import { GestionDesProduitsComponent } from './pages/gestion-des-produits/gestion-des-produits.component';
import { GestionDesCommandesComponent } from './pages/gestion-des-commandes/gestion-des-commandes.component';

export const routes: Routes = 
[
    {path:'', redirectTo:'accueilGlobal', pathMatch: 'full'},

    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: RegisterFormComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'accueilGlobal', component:AccueilGlobalComponent },

    { path: 'commerce/accueil', component:AccueilCommerceComponent },
    { path: 'commerce/profil-commerçant', component:ProfilCommercantComponent },
    { path: 'commerce/gestion-des-produits', component:GestionDesProduitsComponent },
    { path: 'commerce/gestion-des-commandes', component:GestionDesCommandesComponent },
];
