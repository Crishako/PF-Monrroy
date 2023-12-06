import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { addUser, deleteUser, loadUsers, updateUser } from '../../store/user.actions';
import { take } from 'rxjs';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrl: './users-dialog.component.scss'
})
export class UsersDialogComponent {
  
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);
  nameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);
  tokenControl = new FormControl(this.generateRandomToken(), [Validators.required]);
  roleControl = new FormControl('', [Validators.required]);

  userForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
    name: this.nameControl,
    lastname: this.lastNameControl,
    token: this.tokenControl,
    role: this.roleControl
  });

constructor(
  private matDialogRef: MatDialogRef<UsersDialogComponent>,
  private userService: UserService,
  private store: Store,
  private action$: Actions,

  // RECIBO LA DATA (Student)
  @Inject(MAT_DIALOG_DATA) public data:{user:number, tipo:string}
) {
  if (data.user) {
    this.userService.getUserById$(data.user).subscribe({
      next: (u) =>{
        if (u) {
          this.userForm.patchValue(u);
        }
      }
    })
  }

}

public get isEditing(): boolean {
  return this.data.tipo === 'edit';
}

public get isDeleting(): boolean {
  return this.data.tipo === 'delete';
}

public get isAdding(): boolean {
  return this.data.tipo === 'add';
}

public get isDetails(): boolean {
  return this.data.tipo === 'details';
}



onSubmit(): void {
  if (this.userForm.valid) {
    switch (this.data.tipo) {
      case 'add':
        const formValue = this.userForm.getRawValue();

        // Verificar si alguna propiedad es nula y, en ese caso, asignar un valor por defecto
        const user: User = {
          id: Math.floor(Math.random() * 100)|| 0, // Puedes asignar cualquier valor por defecto
          name: formValue.name || '',
          lastname: formValue.lastname || '',
          email: formValue.email || '',
          password: formValue.password || '',
          token: formValue.token || '',
          role: formValue.role || '',
        };

        this.store.dispatch(addUser({ user }));
        break;
    
      case 'edit':
        const formValueEdit = this.userForm.getRawValue();
      
        const editedUser: User = {
          // Puedes obtener el ID del usuario a editar de alguna manera, por ejemplo, desde los datos recibidos
          id: this.data.user,
          name: formValueEdit.name || '',
          lastname: formValueEdit.lastname || '',
          email: formValueEdit.email || '',
          password: formValueEdit.password || '',
          token: formValueEdit.token || '',
          role: formValueEdit.role || '',
        };

        this.store.dispatch(updateUser({ user: editedUser }));
        break;

      case 'delete':
        const userIdToDelete = this.data.user; // Asegúrate de tener el ID del usuario a eliminar
        this.store.dispatch(deleteUser({ userId: userIdToDelete }));
        break;

      default:
        break;
    }
    
  }
}

generateRandomToken() {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0].toString(16);
}


}
