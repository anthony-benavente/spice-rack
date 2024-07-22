import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./services/auth.service";
import { Router, RouterModule } from "@angular/router";
import { ErrorDisplayComponent } from "../util/error-display.component";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, RouterModule, ErrorDisplayComponent],
    providers: [AuthService]
})
export class LoginComponent {
    loginForm = new FormGroup({
        username: new FormControl(),
        password: new FormControl()
    });

    @ViewChild(ErrorDisplayComponent) errorDisplay!: ErrorDisplayComponent;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    onLogIn() {
        const loginData = this.loginForm.value;
        this.authService.login(loginData.username, loginData.password)
            .subscribe({
                next: user => {
                    console.log('Log In successful', user);
                    this.router.navigate(['/']);
                },
                error: err => {
                    const error = err.error;
                    this.errorDisplay.displayMessage(`Uh-oh, we encountered an error: ${error.message}`);
                    console.log(err);
                }
            });
    }
}