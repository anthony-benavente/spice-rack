import { Router } from "@angular/router";
import { AuthService } from "../auth/services/auth.service";
import { Component } from "@angular/core";
import { JwtService } from "../auth/services/jwt.service";

@Component({
    selector: 'logout',
    template: '',
    standalone: true
})
export class LogoutComponent {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
        private router: Router
    ) { }

    ngOnInit() {
        const refToken = this.jwtService.getRefreshToken();
        this.authService.logout(refToken?.token).subscribe({ 
            complete: () => {
                this.router.navigate(['/login']);
            },
            error: () => {
                console.error('Failed to properly logout. Please check logs.');
            }
        });
    }
}