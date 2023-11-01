import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/app/dashboard/models/course';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  private courses: Course[] = [];
  
  getCourses(): Observable<Course[]> {
    return this.http.get<any>('../../../assets/data/alumnos.json').pipe(
      map((data) => {
        if (data && data.alumnos && Array.isArray(data.alumnos)) {
          const courses: Course[] = data.alumnos.map((alumno: any) => {
            return alumno.cursos.map((curso: any) => {
              const course: Course = {
                id: curso.id,
                nombre: curso.nombre,
                fecha_inicio: curso.fecha_inicio,
                fecha_fin: curso.fecha_fin,
                descripcion: curso.descripcion,
                clases: [],
              };
              return course;
            });
          }).flat(); // Usamos flat para aplanar la matriz de cursos
          this.courses = courses;
          return courses;
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

  createCourse(payload: Course): Observable<Course[]>{
    this.courses.push(payload);
    return of([...this.courses]);
  }

  deleteCourse(courseId: number): Observable<Course[]> {
    // Filtramos la lista de estudiantes para eliminar el estudiante con el ID especificado.
    this.courses = this.courses.filter((course) => course.id !== courseId);

    // Devuelve la lista de estudiantes actualizada.
    return of(this.courses);
  }


  editCourse$(id: number, payload: Course): Observable<Course[]> {
    return of(
      this.courses.map((c) => (c.id === id ? { ...c, ...payload } : c))
    );
  }
}
