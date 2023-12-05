import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/auth/models/user';
import { Observable, map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserLoading, selectUsers } from '../../store/user.selector';
import { UsersDialogComponent } from '../users-dialog/users-dialog.component';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent {
  
  users$: Observable<User[]>;
  isLoading$: Observable<boolean>;

  constructor(private store :Store, private userService: UserService, private matDialog: MatDialog){
    this.users$ = this.store.select(selectUsers);
    this.isLoading$ = this.store.select(selectUserLoading);
  }

  
  
  onDetails(userId:number):void{
    const tipo = 'details';
  
    this.matDialog
      .open(UsersDialogComponent, {
        data: { user: userId, tipo: tipo }
      })
  }

  onDeleteUser(userId: number): void {
    const tipo = 'delete';
  
    this.matDialog
      .open(UsersDialogComponent, {
        data: { user: userId, tipo: tipo }
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            // Llama al servicio para realizar la eliminación
            this.userService.deleteUser(userId).subscribe(
              (updatedStudents) => {
                // Actualiza la tabla con la nueva lista de estudiantes después de la eliminación.
                this.users$ = this.userService.getUsers();
                console.log('Usuario eliminado:', result);
              },
              (error) => {
                // Maneja el error si es necesario.
                console.error('Error al eliminar usuario', error);
              }
            );
          }
        },
      });
  }

  onEditUser(userId: number): void {
    let tipo = 'edit';
  
    this.matDialog
      .open(UsersDialogComponent, {
        data: { user: userId, tipo },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.userService.editUser$(userId, result).subscribe(
              (updatedUsers) => {
                // Actualiza la tabla con la nueva lista de estudiantes después de la edición.
                this.users$ = this.userService.getUsers();
              },
              (error) => {
                // Maneja el error si es necesario.
                console.error('Error al editar usuario', error);
              }
            );
          }
        },
      });
  }

  

  

  displayedColumns = ['id', 'name', 'email','role' ,'actions'];
}
