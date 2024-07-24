import { Component } from "@angular/core";
import { provideRouter, RouterModule, ROUTES } from "@angular/router";
import { routes } from './management.routes';

@Component({
    selector: 'app-management',
    template: `
    <h1>Welcome to Spice Rack!</h1>
    <nav class="top-menu">
        <a routerLink="home">Home</a>
        <a routerLink="spice-inventory">My Spices</a>
        <a routerLink="spices">Spices</a>
        <a routerLink="users">Users</a>
    </nav>
    <router-outlet></router-outlet>
    `,
    standalone: true,
    styleUrl: './management.component.scss',
    imports: [RouterModule]
})
export class ManagementComponent {
}