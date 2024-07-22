
import { Routes } from '@angular/router';
import { SpicesComponent } from './spices.component';
import { UsersComponent } from './users.component';
import { IsLoggedInGuard } from '../auth/jwtGuard';
import { HomeComponent } from './home.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'spices', component: SpicesComponent,},
    {path: 'users', component: UsersComponent},
];
