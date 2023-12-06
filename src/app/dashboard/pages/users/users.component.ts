import { Component } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { UserService } from './services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { Store } from '@ngrx/store';

import * as UserActions from './store/user.actions'; // Importa tus acciones de usuario
import * as fromUser from './store/user.selector'; // Importa el estado de usuario
import { User } from 'src/app/auth/models/user';
import { UserState } from './store/user.reducer';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  

  constructor(private userService: UserService, private matDialog: MatDialog, private store: Store<UserState>){
    this.store.dispatch(UserActions.loadUsers());
    
  }
  
  addUser(): void {
    let tipo = 'add';
    this.matDialog
    .open(UsersDialogComponent, {
      data: { tipo }
    })
    
  }
  
}
