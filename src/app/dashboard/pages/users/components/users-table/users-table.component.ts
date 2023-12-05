import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent {
  @Input()
  dataSource: User[] = [];

  @Output()
  editUser = new EventEmitter();

  @Output()
  deleteUser = new EventEmitter();

  displayedColumns = ['id', 'name', 'email','role' ,'actions'];
}
