import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AccueilCommerceComponent } from './pages/accueil-commerce/accueil-commerce.component';
import { AccueilGlobalComponent } from './pages/accueilGlobal/accueil.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { UserCartComponent } from './pages/user-cart/user-cart.component';
import { UserCommandHistoryComponent } from './pages/user-command-history/user-command-history.component';
import { UserCommentComponent } from './pages/user-comment/user-comment.component';
import { UserProfilComponent } from './pages/user-profil/user-profil.component';
import { MarchesComponent } from './pages/marches/marches.component';
import { PageMarcheComponent } from './pages/page-marche/page-marche.component';
import { GestionDesCommandesComponent } from './pages/gestion-des-commandes/gestion-des-commandes.component';
import { GestionDesProduitsComponent } from './pages/gestion-des-produits/gestion-des-produits.component';
import { ProfilCommercantComponent } from './pages/profil-commercant/profil-commercant.component';

export const routes: Routes = 
[
    {path:'', redirectTo:'accueilGlobal', pathMatch: 'full'},

    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: RegisterFormComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'accueilGlobal', component:AccueilGlobalComponent },
    { path: 'marches', component:MarchesComponent},
    { path: 'marches/:id', component:PageMarcheComponent},

    { path: 'commerce/accueil', component:AccueilCommerceComponent },
    { path: 'commerce/profil-commerçant/:id', component:ProfilCommercantComponent },
    { path: 'commerce/gestion-des-produits', component:GestionDesProduitsComponent },
    { path: 'commerce/gestion-des-commandes', component:GestionDesCommandesComponent },
    { path: 'user-profil', component: UserProfilComponent},
    { path: 'user-command-history/:userId', component: UserCommandHistoryComponent },
    { path: 'user-cart', component: UserCartComponent },
    { path: 'user-comments', component: UserCommentComponent },
];
