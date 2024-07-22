import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./services/auth.service";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-register',
    template: `
    <h1>Register</h1>
    <form [formGroup]="registerForm" *ngIf="!displaySuccess">
        <input formControlName="email" placeholder="Email Address" type="email">
        <input formControlName="name" placeholder="Name">
        <input formControlName="username" placeholder="Username">
        <input formControlName="password" placeholder="Password" type="password">
        <input formControlName="confirmPassword" placeholder="Confirm Password" type="password">
        <button type="button" (click)="onRegister()">Register</button>
    </form>
    <p *ngIf="displaySuccess">
        Successfully created user!
        <a routerLink="/login">Log In Now</a>
    </p>
    `,
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    providers: [AuthService]
})
export class RegisterComponent {

    registerForm = new FormGroup({
        username: new FormControl(),
        name: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        confirmPassword: new FormControl()
    });
    displaySuccess: boolean = false;

    constructor(
        private authService: AuthService
    ) { }

    onRegister() {
        const registerData = {
            username: this.registerForm.value.username,
            name: this.registerForm.value.name,
            email: this.registerForm.value.email,
            password: this.registerForm.value.password
        };

        if (registerData.password != this.registerForm.value.confirmPassword) {
            alert('Password doesn\'t match!');
        } else {
            this.authService.register(registerData).subscribe(data => {
                console.log(data);
                this.displaySuccess = true;
            });
        }
    }
}