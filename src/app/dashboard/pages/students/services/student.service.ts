import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,catchError,map, of, tap} from 'rxjs';
import { Course } from 'src/app/dashboard/models/course';
import { Student } from 'src/app/dashboard/models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private _student$ = new BehaviorSubject<Student | null>(null);

  public student$ = this._student$.asObservable();

  private apiUrl = "https://654bf2e15b38a59f28eff3b9.mockapi.io/api/v1";

  constructor(private http: HttpClient) { }

  private students: Student[] = [];
  
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/students`).pipe(
      map((data) => {
        if (data ) {
          this.students = data.map((alumno: Student) => {
            const student: Student = {
              id: alumno.id,
              nombre: alumno.nombre,
              apellido: alumno.apellido,
              edad: alumno.edad,
              genero: alumno.genero,
              email: alumno.email,
              cursos: alumno.cursos,
            }
            return student;
          });
          return this.students
        } else {
          console.error('Los datos no tienen la estructura esperada.');
          return []; // Devolver una matriz vacía o realizar otro manejo de errores aquí.
        }
      })
    );
  }


  //FALTA COMPLETAR ESTA FUNCIÓN
  getStudentById$(id: number): Observable<Student | undefined> {
    return of(this.students.find((c) => c.id === id));
  }

  createStudent(payload: Student): Observable<Student> {
    return this.http
      .post<Student>(
        `${this.apiUrl}/students`,
        {
          nombre: payload.nombre,
          apellido: payload.apellido,
          email: payload.email,
          genero: payload.genero,
          edad: payload.edad,
          cursos: [],
        }
      )
      .pipe(
        tap((student) => {
          this._student$.next(student);
          alert('Alumno creado');
        }),
        catchError((err) => {
          alert('Error al registrar alumno');
          throw err; 
        })
      );
  }
  

  

  deleteStudent(studentId: number): Observable<Student[]> {
    // Envía una solicitud DELETE al servidor para eliminar el estudiante con el ID especificado.
    return this.http
      .delete<Student[]>(`${this.apiUrl}/students/${studentId}`)
      .pipe(
        catchError((err) => {
          // Puedes manejar el error según tus necesidades
          throw err;
        })
      );
  }


  editStudent$(id: number, payload: Student): Observable<Student[]> {
    return this.http
      .put<Student[]>(`${this.apiUrl}/students/${id}`, payload)
      .pipe(
        catchError((err) => {
          // Puedes manejar el error según tus necesidades
          throw err;
        })
      );
  }
}
