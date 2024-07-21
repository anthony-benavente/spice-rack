import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-home',
    template: `
    <h1>Welcome to Spice Rack!</h1>
    <nav class="top-menu">
        <a routerLink="management/spices">Spices</a>
        <a routerLink="management/users">Users</a>
    </nav>
    <router-outlet></router-outlet>
    `,
    standalone: true,
    imports: [RouterModule]
})
export class HomeComponent {
}