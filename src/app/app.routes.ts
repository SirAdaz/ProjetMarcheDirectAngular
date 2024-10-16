import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AccueilCommerceComponent } from './pages/accueil-commerce/accueil-commerce.component';
import { AccueilGlobalComponent } from './pages/accueilGlobal/accueil.component';
import { UserProfilComponent } from './pages/user-profil/user-profil.component';
import { UserCommandHistoryComponent } from './pages/user-command-history/user-command-history.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserCommentComponent } from './pages/user-comment/user-comment.component';
import { MarchesComponent } from './pages/marches/marches.component';
import { PageMarcheComponent } from './pages/page-marche/page-marche.component';
import { RgpdComponent } from './pages/legal/rgpd/rgpd.component';
import { MentionLegaleComponent } from './pages/legal/mention-legale/mention-legale.component';
import { LoginFormComponent } from './pages/formulaires/login-form/login-form.component';
import { RegisterFormComponent } from './pages/formulaires/register-form/register-form.component';
import { UserCartComponent } from './pages/pages-client/user-cart/user-cart.component';

export const routes: Routes = 
[
    { path:'', redirectTo:'accueilGlobal', pathMatch: 'full'},

    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: RegisterFormComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'accueilGlobal', component:AccueilGlobalComponent },
    { path: 'marches', component:MarchesComponent},
    { path: 'marches/:id', component:PageMarcheComponent},

    { path: 'commerce/accueil', component:AccueilCommerceComponent },
    { path: 'user-profil', component: UserProfilComponent},
    { path: 'user-command-history/:userId', component: UserCommandHistoryComponent },
    { path: 'user-cart', component: UserCartComponent },
    { path: 'user-comments', component: UserCommentComponent },

    { path: 'rgpd', component:RgpdComponent },
    { path: 'mention', component:MentionLegaleComponent },
];
