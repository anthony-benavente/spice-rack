import { Component } from '@angular/core';
import { UsersComponent } from './management/users.component';
import { SpicesComponent } from './management/spices.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './management/home.component';
import { ManagementComponent } from './management/management.component';
import { SpiceInventoryComponent } from './management/spice-inventory.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    RouterModule,
    ManagementComponent, 
    HomeComponent, 
    UsersComponent, 
    SpicesComponent,
    SpiceInventoryComponent
  ]
})
export class AppComponent {
}
