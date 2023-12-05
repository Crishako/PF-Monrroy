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

  // addUser(): void {
  //   let tipo = 'add';
  //   this.matDialog
  //     .open(UsersDialogComponent, {
  //       data: { tipo }
  //     })
  //     .afterClosed()
  //     .subscribe({
  //       next: (result) => {
  //         if (result) {
  //           this.userService.createUser({
  //             id: Math.floor(Math.random() * 100),
  //             name: result.name,
  //             lastname: result.lastname,
  //             email: result.email,
  //             password: result.password,
  //             token: result.token,
  //             role: result.role

  //           }).subscribe(
  //             (newUser) => {
  //               this.users$ = this.users$.pipe(
  //                 take(1),
  //                 map((users) => {
  //                   const uniqueUsers = [...users, newUser].filter(
  //                     (user, index, self) =>
  //                       index === self.findIndex((s) => s.id === user.id)
  //                   );
  //                   return uniqueUsers;
  //                 })
  //               );
  //             }
  //           );
  //         }
  //       },
  //     });
  // }
  
  

  // onDeleteUser(userId: number): void {
  //   const tipo = 'delete';
  
  //   this.matDialog
  //     .open(UsersDialogComponent, {
  //       data: { user: userId, tipo: tipo }
  //     })
  //     .afterClosed()
  //     .subscribe({
  //       next: (result) => {
  //         if (result) {
  //           // Llama al servicio para realizar la eliminación
  //           this.userService.deleteUser(userId).subscribe(
  //             (updatedStudents) => {
  //               // Actualiza la tabla con la nueva lista de estudiantes después de la eliminación.
  //               this.users$ = this.userService.getUsers();
  //               console.log('Usuario eliminado:', result);
  //             },
  //             (error) => {
  //               // Maneja el error si es necesario.
  //               console.error('Error al eliminar usuario', error);
  //             }
  //           );
  //         }
  //       },
  //     });
  // }

  // onEditUser(userId: number): void {
  //   let tipo = 'edit';
  
  //   this.matDialog
  //     .open(UsersDialogComponent, {
  //       data: { user: userId, tipo },
  //     })
  //     .afterClosed()
  //     .subscribe({
  //       next: (result) => {
  //         if (!!result) {
  //           this.userService.editUser$(userId, result).subscribe(
  //             (updatedUsers) => {
  //               // Actualiza la tabla con la nueva lista de estudiantes después de la edición.
  //               this.users$ = this.userService.getUsers();
  //             },
  //             (error) => {
  //               // Maneja el error si es necesario.
  //               console.error('Error al editar usuario', error);
  //             }
  //           );
  //         }
  //       },
  //     });
  // }

  
}
