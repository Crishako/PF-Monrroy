import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map, of} from 'rxjs';
import { Course } from 'src/app/dashboard/models/course';
import { Student } from 'src/app/dashboard/models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  private students: Student[] = [];
  
  getStudents(): Observable<Student[]> {
    return this.http.get<any>('../../../assets/data/alumnos.json').pipe(
      map((data) => {
        if (data && data.alumnos && Array.isArray(data.alumnos)) {
          this.students = data.alumnos.map((alumno: any) => {
            const student: Student = {
              id: alumno.id,
              nombre: alumno.nombre,
              apellido: alumno.apellido,
              edad: alumno.edad,
              genero: alumno.genero,
              email: alumno.email,
              cursos: alumno.cursos.map((curso: any) => {
                const course: Course = {
                  id: curso.id,
                  nombre: curso.nombre,
                  fecha_inicio: curso.fecha_inicio,
                  fecha_fin: curso.fecha_fin,
                  descripcion: curso.descripcion,
                  clases: curso.clases.map((clase: any) => {
                    return {
                      id: clase.id,
                      nombre: clase.nombre,
                      profesor: clase.profesor,
                      horario: clase.horario,
                      descripcion: clase.descripcion,
                      calificaciones: {
                        certamen1: clase.calificaciones.certamen1,
                        certamen2: clase.calificaciones.certamen2,
                        certamen3: clase.calificaciones.certamen3,
                        examen: clase.calificaciones.examen,
                      },
                    };
                  }),
                };
                return course;
              }),
            };
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

  getStudentById$(id: number): Observable<Student | undefined> {
    return of(this.students.find((c) => c.id === id));
  }

  createStudent(payload: Student): Observable<Student[]>{
    this.students.push(payload);
    return of([...this.students]);
  }

  deleteStudent(studentId: number): Observable<Student[]> {
    // Filtramos la lista de estudiantes para eliminar el estudiante con el ID especificado.
    this.students = this.students.filter((student) => student.id !== studentId);

    // Devuelve la lista de estudiantes actualizada.
    return of(this.students);
  }


  editStudent$(id: number, payload: Student): Observable<Student[]> {
    return of(
      this.students.map((c) => (c.id === id ? { ...c, ...payload } : c))
    );
  }
}
