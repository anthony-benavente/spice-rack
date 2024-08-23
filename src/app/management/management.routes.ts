
import { Routes } from '@angular/router';
import { SpicesComponent } from './spices.component';
import { UsersComponent } from './users.component';
import { HomeComponent } from './home.component';
import { SpiceInventoryComponent } from './spice-inventory.component';
import { LogoutComponent } from './logout.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'spices', component: SpicesComponent,},
    {path: 'users', component: UsersComponent},
    {path: 'spice-inventory', component: SpiceInventoryComponent},
    {path: 'logout', component: LogoutComponent},
];
