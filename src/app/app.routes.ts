import { Routes } from '@angular/router';
import { SpicesComponent } from './management/spices.component';
import { UsersComponent } from './management/users.component';
import { LoginComponent } from './auth/login.component';
import { HomeComponent } from './management/home.component';
import { IsLoggedInGuard } from './auth/jwtGuard';
import { RegisterComponent } from './auth/register.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', component: HomeComponent, canActivate: [IsLoggedInGuard]},
    {path: 'management/spices', component: SpicesComponent, canActivate: [IsLoggedInGuard]},
    {path: 'management/users', component: UsersComponent, canActivate: [IsLoggedInGuard]},
    {path: '**', redirectTo: ''}
];
