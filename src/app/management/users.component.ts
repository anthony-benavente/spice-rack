import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { jqxGridComponent, jqxGridModule } from "jqwidgets-ng/jqxgrid";
import { UsersService } from "../services/users.service";
import { catchError, forkJoin, Observable, of } from "rxjs";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  standalone: true,
  imports: [jqxGridModule, ReactiveFormsModule],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  @ViewChild('userGrid') userGrid!: jqxGridComponent;
  columns = [
    { text: 'Id', dataField: 'id', hidden: true },
    { text: 'Name', dataField: 'name' },
    { text: 'Email', dataField: 'email' },
    { text: 'Username', dataField: 'username' },
    { text: 'Password', dataField: 'password', hidden: true },
    { text: 'Created Date', datafield: 'createdAt', columntype: 'datetimeinput', cellsformat: 'MMM d, y, hh:mm:ss' },
    { text: 'Updated Date', datafield: 'updatedAt', columntype: 'datetimeinput', cellsformat: 'MMM d, y, hh:mm:ss' },
  ];
  source: any = {
    localdata: [],
    datafields: [
      { name:  'id', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'username', type: 'string' },
      { name: 'password', type: 'string' },
      { name: 'createdAt', type: 'date' },
      { name: 'updatedAt', type: 'date' },
    ],
    datatype: 'array'
  }
  dataAdapter = new jqx.dataAdapter(this.source);
  addUserForm = new FormGroup({
    name: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
    role: new FormControl()
  })

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.refreshGrid();
  }

  addUser() {
    const toAdd = {
      ...this.addUserForm.value,
      role: this.addUserForm.value.role ? 'admin' : 'user'
    };
    this.usersService.createUser(toAdd).subscribe({
      next: data => {
        this.userGrid.addrow(data.id, data);
        this.userGrid.autoresizecolumns();
        this.addUserForm.reset();
      },
      error: err => {
        alert('Something went wrong while adding the user!');
        console.log(err);
      }
    })
  }

  refreshGrid() {
    this.usersService.getUsers().subscribe(data => {
      this.source.localdata = data;
      this.userGrid.updatebounddata('cells');
      this.userGrid.autoresizecolumns();
    })
  }

  deleteUser() {
    const selectedIndexes = this.userGrid.getselectedrowindexes();
    let deleteRequests: Observable<any>[] = [];

    selectedIndexes.forEach(index => {
      const data = this.userGrid.getrowdata(index);
      
      if (confirm(`Are you sure you want to delete this user: ${data.name}`)) {
        deleteRequests.push(this.usersService.deleteUser(data.id).pipe(
          catchError(err => {
            console.error(err);
            return of(err);
          })
        ));
      }
    });

    forkJoin(deleteRequests).subscribe({
      next: () => {
        // success
        this.refreshGrid();
      },
      error: (err) => {
        // error
        console.log('Something went wrong while deleting...', err);
      }
    })
  }
}