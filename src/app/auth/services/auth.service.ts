import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable , map} from 'rxjs';
import { User } from '../models/user';
import { LoginPayload } from '../models/login';
import { RegisterPayload } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authUser$ = new BehaviorSubject<User | null>(null);

  public authUser$ = this._authUser$.asObservable();

  private apiUrl = "https://654bf2e15b38a59f28eff3b9.mockapi.io/api/v1/";

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(payload: LoginPayload): void {
    // const headers = new HttpHeaders({
    //   token: localStorage.getItem('token') || 'NO HAY TOKEN',
    // });
    this.httpClient
      .get<User[]>(
        `${this.apiUrl}/users?email=${payload.email}&password=${payload.password}`
      )
      .subscribe({
        next: (response) => {
          if (!response.length) {
            alert('Usuario o contrasena invalidos');
          } else {
            const authUser = response[0];
            if(authUser.password == payload.password){
              this._authUser$.next(authUser);
              localStorage.setItem('token', authUser.token);
              this.router.navigate(['/dashboard/home']);
            }else{
              alert('Usuario o contrasena invalidos');
            }
            
          }
        },
        error: (err) => {
          alert('Error de conexion');
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
          token: payload.token
        }
      )
      .subscribe({
        next: (authUser) => {
          this._authUser$.next(authUser);
          alert('Usuario creado');
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          alert('Error al registrar usuario');
        },
      });
  }
  
  // "name": "Bernadette",
  // "lastname": "Johns",
  // "email": "Ned31@gmail.com",
  // "password": "1gehMIgQB5SLvXO",
  // "token": "tvVDmdIuraGJfrH",
  // "createdAt": "2023-11-08T11:11:21.828Z",
  // "updatedAt": 1699479118,
  // "deletedAt": 1699479118,
  // "id": "1"
  

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
            this._authUser$.next(authUser);
            localStorage.setItem('token', authUser.token);
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
