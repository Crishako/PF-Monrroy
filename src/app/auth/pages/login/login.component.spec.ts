// Import necessary modules
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let servicio: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule, 
      ],
      providers: [AuthService],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Debe inicializar el form del login con los controladores de correo y contraseña', () => {
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');
    expect(emailControl).toBeTruthy();
    expect(passwordControl).toBeTruthy();
  });

  it('Debe llamar al servicio AuthService.login cuando se haga click en el botón login con un formulario valido', () => {
    const authService = TestBed.inject(AuthService); 
    spyOn(authService, 'login'); 
  
    component.emailControl.setValue('test@example.com');
    component.passwordControl.setValue('password123');
    component.loginForm.markAsDirty();
    component.login();
  
    expect(authService.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('Debe marcar todos los controles como tocados si el formulario no es válido', () => {
    const authService = TestBed.inject(AuthService); 
    spyOn(authService, 'login');
    component.login();
    expect(component.loginForm.touched).toBe(true);
  });
  
});
