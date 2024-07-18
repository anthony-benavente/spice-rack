import { Component, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { jqxGridComponent, jqxGridModule } from "jqwidgets-ng/jqxgrid";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  imports: [jqxGridModule, ReactiveFormsModule],
  standalone: true
})
export class UsersComponent {

  @ViewChild('userGrid') userGrid!: jqxGridComponent;
  usersColumns = [
    { text: 'Id', dataField: '_id' },
    { text: 'Name', dataField: 'name' },
    { text: 'Username', dataField: 'username' },
    { text: 'Password', dataField: 'password' },
    { text: 'Salt', dataField: 'salt' }
  ];
  usersData: any[] = [];
  addUserForm = new FormGroup({
    name: new FormControl(),
    username: new FormControl(),
    password: new FormControl()
  })

  addUser() {
    const toAdd = {
      ...this.addUserForm.value, 
      createdDate: new Date(),
      updatedDate: new Date()
    };
    console.log('Inserting user to database: ', toAdd);
    this.userGrid.addrow(null, toAdd);
    this.userGrid.autoresizecolumns();
    this.addUserForm.reset();
  }
}