import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterPayload } from '../../models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);
  nameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);
  tokenControl = new FormControl(this.generateRandomToken(), [Validators.required]);
  roleControl = new FormControl('DIRECTOR',[Validators.required]);

  registerForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
    name: this.nameControl,
    lastName: this.lastNameControl,
    token: this.tokenControl,
    role: this.roleControl
  });

  constructor(private authService: AuthService, private router: Router) {}

  // register.component.ts
  register(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      const registerPayload: RegisterPayload = {
        email: this.registerForm.get('email')?.value || null,
        password: this.registerForm.get('password')?.value || null,
        name: this.registerForm.get('name')?.value || null,
        lastname: this.registerForm.get('lastName')?.value || null,
        token: this.registerForm.get('token')?.value || null,
        role: this.registerForm.get('role')?.value || null
      };

      this.authService.register(registerPayload);
    }
  }

  generateRandomToken() {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0].toString(16);
  }
}
