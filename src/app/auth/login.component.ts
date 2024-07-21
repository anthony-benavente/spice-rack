import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true
})
export class LoginComponent {
    loginForm = new FormGroup({
        username: new FormControl(),
        password: new FormControl()
    });

    onLogIn() {
        console.log(this.loginForm);
    }
}