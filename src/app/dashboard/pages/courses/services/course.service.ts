import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/app/dashboard/models/course';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _course$ = new BehaviorSubject<Course | null>(null);

  public course$ = this._course$.asObservable();

  private apiUrl = "https://654bf2e15b38a59f28eff3b9.mockapi.io/api/v1";

  constructor(private http: HttpClient) { }

  private courses: Course[] = [];
  
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses`).pipe(
      map((data) => {
        if (data) {
          this.courses = data.map((curso: Course) => {
            const course: Course = {
              id: curso.id,
              nombre: curso.nombre,
              descripcion: curso.descripcion,
              fecha_inicio: curso.fecha_inicio,
              fecha_fin: curso.fecha_fin,
              clases: curso.clases
            }
            return course;
          }); // Usamos flat para aplanar la matriz de cursos
            return this.courses
        } else {
          console.error('Los datos no tienen la estructura esperada.');
          return []; // Devolver una matriz vacía o realizar otro manejo de errores aquí.
        }
      })
    );
  }
  
  

  getCourseById$(id: number): Observable<Course | undefined> {
    return of(this.courses.find((c) => c.id === id));
  }

  createCourse(payload: Course): Observable<Course> {
    return this.http
      .post<Course>(
        `${this.apiUrl}/courses`,
        {
          nombre: payload.nombre,
          fecha_inicio: payload.fecha_inicio,
          fecha_fin: payload.fecha_fin,
          descripcion: payload.descripcion,
          clases: payload.clases || [],
        }
      )
      .pipe(
        tap((course) => {
          this._course$.next(course);
          alert('Curso creado');
        }),
        catchError((err) => {
          alert('Error al crear el curso');
          throw err;
        })
      );
  }


  deleteCourse(courseId: number): Observable<Course[]> {
    // Envía una solicitud DELETE al servidor para eliminar el estudiante con el ID especificado.
    return this.http
      .delete<Course[]>(`${this.apiUrl}/courses/${courseId}`)
      .pipe(
        catchError((err) => {
          // Puedes manejar el error según tus necesidades
          throw err;
        })
      );
  }


  editCourse$(id: number, payload: Course): Observable<Course[]> {
    return this.http
      .put<Course[]>(`${this.apiUrl}/courses/${id}`, payload)
      .pipe(
        catchError((err) => {
          // Puedes manejar el error según tus necesidades
          throw err;
        })
      );
  }
}
