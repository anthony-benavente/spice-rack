import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-management',
    template: `
    <h1>Welcome to Spice Rack!</h1>
    <nav class="top-menu">
        <a routerLink="home">Home</a>
        <a routerLink="spice-inventory">My Spices</a>
        <a routerLink="spices">Spices</a>
        <a routerLink="users">Users</a>
        <a routerLink="logout">Log Out</a>
    </nav>
    <router-outlet></router-outlet>
    `,
    standalone: true,
    styleUrl: './management.component.scss',
    imports: [RouterModule]
})
export class ManagementComponent {
}