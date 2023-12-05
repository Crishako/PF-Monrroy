import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';

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
  private fb: FormBuilder,
  private matDialogRef: MatDialogRef<UsersDialogComponent>,
  private userService: UserService,

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




onSubmit(): void {
  if (this.userForm.invalid) {
    return this.userForm.markAllAsTouched();
  } else {
    this.matDialogRef.close(this.userForm.value);
  }
}

generateRandomToken() {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0].toString(16);
}


}
