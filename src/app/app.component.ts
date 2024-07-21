import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpiceForms } from '../db/spiceForms.enum';
import { jqxGridComponent, jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './management/users.component';
import { SpicesComponent } from './management/spices.component';
import { RouterModule } from '@angular/router';
import { JwtService } from './auth/services/jwt.service';
import { IsLoggedInGuard } from './auth/jwtGuard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [UsersComponent,SpicesComponent, RouterModule]
})
export class AppComponent {
;
}
