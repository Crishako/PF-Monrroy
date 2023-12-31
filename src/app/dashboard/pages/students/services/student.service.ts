import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,catchError,map, of, tap, throwError} from 'rxjs';
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

  addCoursesToStudent(studentId: number, courseIds: number[]): Observable<Student> {
    const url = `${this.apiUrl}/students/${studentId}`;
  
    const currentStudent = this.students.find((student) => student.id === studentId);
  
    if (!currentStudent) {
      return throwError('Estudiante no encontrado');
    }
  
    const updatedStudent: Student = {
      ...currentStudent,
      cursos: currentStudent.cursos ? [...currentStudent.cursos, ...courseIds] : [...courseIds],
    };
  
    return this.http.put<Student>(url, updatedStudent).pipe(
      tap(() => {
        this.students = this.students.map((student) =>
          student.id === studentId ? updatedStudent : student
        );
        this._student$.next(updatedStudent);
        alert('Cursos agregados al estudiante');
      }),
      catchError((err) => {
        alert('Error al agregar cursos al estudiante');
        throw err;
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
  
    return this.http
      .delete<Student[]>(`${this.apiUrl}/students/${studentId}`)
      .pipe(
        catchError((err) => {
  
          throw err;
        })
      );
  }


  editStudent$(id: number, payload: Student): Observable<Student[]> {
    return this.http
      .put<Student[]>(`${this.apiUrl}/students/${id}`, payload)
      .pipe(
        catchError((err) => {
          throw err;
        })
      );
  }
}
