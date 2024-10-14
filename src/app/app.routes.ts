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

export const routes: Routes = 
[
    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: RegisterFormComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'accueilGlobal', component:AccueilGlobalComponent },

    { path: 'commerce/accueil', component:AccueilCommerceComponent },
    { path: 'accueilGlobal', component:AccueilGlobalComponent },
    { path: 'user-profil', component: UserProfilComponent},
    { path: 'user-command-history/:userId', component: UserCommandHistoryComponent },
    { path: 'user-cart', component: UserCartComponent },
    { path: 'user-comments', component: UserCommentComponent },
];
