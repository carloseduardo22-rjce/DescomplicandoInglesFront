import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth/auth.guard';
import { GramaticaComponent } from './gramatica/gramatica.component';
import { VocabularioComponent } from './vocabulario/vocabulario.component';
import { HistoryComponent } from './history/history.component';
import { AnnotationComponent } from './annotation/annotation.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            { path: 'home', component: HistoryComponent, canActivate: [authGuard] },
            { path: 'gramatica', component: GramaticaComponent, canActivate: [authGuard] },
            { path: 'vocabulario', component: VocabularioComponent, canActivate: [authGuard] },
            { path: 'anotacoes', component: AnnotationComponent, canActivate: [authGuard] }
        ],
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];
