import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./services/auth.service";
import { Router, RouterModule } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, RouterModule],
    providers: [AuthService]
})
export class LoginComponent {
    loginForm = new FormGroup({
        username: new FormControl(),
        password: new FormControl()
    });

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    onLogIn() {
        const loginData = this.loginForm.value;
        this.authService.login(loginData.username, loginData.password).subscribe(user => {
            console.log('Log In successful', user);
            this.router.navigate(['/']);
        });
    }
}