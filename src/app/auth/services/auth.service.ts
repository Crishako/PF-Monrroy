import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user';
import { LoginPayload } from '../models/login';
import { RegisterPayload } from '../models/register';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/auth.actions';
import { selectAuthUser } from '../store/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<User | null>(null);

  public authUser$ = this.store.select(selectAuthUser);

  private apiUrl = 'https://654bf2e15b38a59f28eff3b9.mockapi.io/api/v1/';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store
  ) {}

  private handleAuthUser(authUser: User): void {
    this.store.dispatch(AuthActions.setAuthUser({ data: authUser }));
    localStorage.setItem('token', authUser.token);
  }

  login(payload: LoginPayload): void {
    this.httpClient
      .get<User[]>(
        `${this.apiUrl}/users?email=${payload.email}&password=${payload.password}`
      )
      .subscribe({
        next: (response) => {
          if (!response.length) {
            alert('Usuario o contraseña inválidos');
          } else {
            const authUser = response[0];
            if (authUser.password == payload.password) {
              this.handleAuthUser(authUser);
              this.router.navigate(['/dashboard/home']);
            } else {
              alert('Usuario o contraseña inválidos');
            }
          }
        },
        error: (err) => {
          alert('Error de conexión');
        },
      });
  }

  register(payload: RegisterPayload): void {
    this.httpClient
      .post<User>(
        `${this.apiUrl}/users`,
        {
          email: payload.email,
          password: payload.password,
          name: payload.name,
          lastname: payload.lastname,
          token: payload.token,
          role: payload.role
        }
      )
      .subscribe({
        next: (authUser) => {
          this.handleAuthUser(authUser);
          alert('Usuario creado');
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          alert('Error al registrar usuario');
        },
      });
  }

  verifyToken(): Observable<boolean> {
    return this.httpClient
      .get<User[]>(
        `${this.apiUrl}/users?token=${localStorage.getItem('token')}`
      )
      .pipe(
        map((users) => {
          if (!users.length) {
            return false;
          } else {
            const authUser = users[0];
            this.handleAuthUser(authUser);
            return true;
          }
        })
      );
  }

  logout(): void {
    this._authUser$.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
