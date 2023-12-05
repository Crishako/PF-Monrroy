import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { User } from 'src/app/auth/models/user';
import { StudentService } from '../../students/services/student.service';
import { Student } from 'src/app/dashboard/models/student';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user$ = new BehaviorSubject<User | null>(null);

  public user$ = this._user$.asObservable();

  private apiUrl = "https://654bf2e15b38a59f28eff3b9.mockapi.io/api/v1";

  constructor(private http: HttpClient, private studentService: StudentService) { }

  private users: User[] = [];

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      map((data) => {
        if (data ) {
          this.users = data.map((usuario: User) => {
            const user: User = {
              id: usuario.id,
              name: usuario.name,
              lastname: usuario.lastname,
              email: usuario.email,
              password: usuario.password,
              token: usuario.token,
              role: usuario.role
            }
            return user;
          });
          return this.users
        } else {
          console.error('Los datos no tienen la estructura esperada.');
          return []; // Devolver una matriz vacía o realizar otro manejo de errores aquí.
        }
      })
    );
  }


  //FALTA COMPLETAR ESTA FUNCIÓN
  getUserById$(id: number): Observable<User | undefined> {
    return of(this.users.find((u) => u.id === id));
  }

  createUser(payload: User): Observable<User> {
    return this.http
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
      .pipe(
        tap((user) => {
          this._user$.next(user);
          alert('Usuario creado');
          // Verificar el role y llamar al servicio correspondiente
          if (payload.role === 'STUDENT') {
            const studentPayload: Student = {
              ...payload, // Copiar las propiedades del usuario
              nombre: payload.name,
              apellido: payload.lastname,
              email: payload.email,
              edad: -1,
              genero: '',
              cursos:[]
            };
            this.createStudent(studentPayload);
          }
        }),
        catchError((err) => {
          alert('Error al registrar usuario');
          throw err; 
        })
      );
  }
  

  private createStudent(payload: Student): void {
    // Llama al servicio createStudent de StudentService
    this.studentService.createStudent(payload).subscribe(
      (student) => {
        // Manejar el éxito si es necesario
        console.log(student);
        
      },
      (error) => {
        console.error('Error al crear estudiante', error);
        // Puedes manejar el error aquí si es necesario
      }
    );
  }

  

  deleteUser(userId: number): Observable<User[]> {
    // Envía una solicitud DELETE al servidor para eliminar el estudiante con el ID especificado.
    return this.http
      .delete<User[]>(`${this.apiUrl}/users/${userId}`)
      .pipe(
        catchError((err) => {
          // Puedes manejar el error según tus necesidades
          throw err;
        })
      );
  }


  editUser$(id: number, payload: User): Observable<User[]> {
    return this.http
      .put<User[]>(`${this.apiUrl}/users/${id}`, payload)
      .pipe(
        catchError((err) => {
          // Puedes manejar el error según tus necesidades
          throw err;
        })
      );
  }
}
