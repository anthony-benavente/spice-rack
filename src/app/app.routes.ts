import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { IsLoggedInGuard } from './auth/jwtGuard';
import { RegisterComponent } from './auth/register.component';
import { routes as managementRoutes } from './management/management.routes';
import { ManagementComponent } from './management/management.component';
import { HomeComponent } from './management/home.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {
        path: 'management', 
        component: ManagementComponent, 
        canActivate: [IsLoggedInGuard],
        children: managementRoutes
    },
    {path: '**', redirectTo: 'management/home'}
];
