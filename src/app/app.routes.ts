import { Routes } from '@angular/router';
import { SpicesComponent } from './management/spices.component';
import { UsersComponent } from './management/users.component';

export const routes: Routes = [
    {path: 'management/spices', component: SpicesComponent},
    {path: 'management/users', component: UsersComponent},
];
