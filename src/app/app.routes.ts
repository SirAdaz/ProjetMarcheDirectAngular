import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AccueilCommerceComponent } from './pages/pages-commerces/accueil-commerce/accueil-commerce.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MarchesComponent } from './pages/marches/marches.component';
import { PageMarcheComponent } from './pages/page-marche/page-marche.component';
import { RgpdComponent } from './pages/legal/rgpd/rgpd.component';
import { MentionLegaleComponent } from './pages/legal/mention-legale/mention-legale.component';
import { LoginFormComponent } from './pages/formulaires/login-form/login-form.component';
import { RegisterFormComponent } from './pages/formulaires/register-form/register-form.component';
import { UserCartComponent } from './pages/pages-client/user-cart/user-cart.component';
import { NotFoundComponent } from './pages/pages-erreurs/not-found/not-found.component';
import { InterditComponent } from './pages/pages-erreurs/interdit/interdit.component';
import { UserCommandHistoryComponent } from './pages/pages-client/user-command-history/user-command-history.component';
import { UserCommentComponent } from './pages/pages-client/user-comment/user-comment.component';
import { UserProfilComponent } from './pages/pages-client/user-profil/user-profil.component';
import { UnavailableComponent } from './pages/pages-erreurs/unavailable/unavailable.component';
import { ProduitsComponent } from './pages/produits/produits.component';
import { CgvComponent } from './pages/legal/cgv/cgv.component';

export const routes: Routes = 
[
    // redirection
    { path:'', redirectTo:'accueil', pathMatch: 'full'},

    // formulaires
    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: RegisterFormComponent },

    // pages administration
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },

    // pages global
    { path: 'accueil', component:AccueilComponent },
    { path: 'marches', component:MarchesComponent},
    { path: 'marches/:id', component:PageMarcheComponent},
    { path: 'produits', component:ProduitsComponent},

    // pages commerces
    { path: 'commerce/accueil', component:AccueilCommerceComponent },

    // pages client
    { path: 'user/profil/:id', component: UserProfilComponent },
    { path: 'user/command-history/:userId', component: UserCommandHistoryComponent },
    { path: 'user/cart', component: UserCartComponent },
    { path: 'user/comments', component: UserCommentComponent },

    // pages legales
    { path: 'rgpd', component:RgpdComponent },
    { path: 'mention', component:MentionLegaleComponent },
    { path: 'cgv', component: CgvComponent },
    
    // pages erreurs
    { path: 'notfound', component:NotFoundComponent },
    { path: 'interdit', component:InterditComponent },
    { path: 'unavailable', component:UnavailableComponent },
];
