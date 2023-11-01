import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Lecture } from 'src/app/dashboard/models/lecture';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  constructor(private http: HttpClient) { }

  private lectures: Lecture[] = [];
  
  getLectures(): Observable<Lecture[]> {
    return this.http.get<any>('../../../assets/data/alumnos.json').pipe(
      map((data) => {
        if (data && data.alumnos && Array.isArray(data.alumnos)) {
          const lectures: Lecture[] = data.alumnos.flatMap((alumno: any) => {
            if (alumno.cursos && Array.isArray(alumno.cursos)) {
              return alumno.cursos.flatMap((curso: any) => {
                if (curso.clases && Array.isArray(curso.clases)) {
                  return curso.clases.map((clase: any) => {
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
                  });
                }
                return [];
              });
            }
            return [];
          });
          this.lectures = lectures
          return lectures;
        } else {
          console.error('Los datos no tienen la estructura esperada.');
          return []; // Devolver una matriz vacía o realizar otro manejo de errores aquí.
        }
      })
    );
  }
  
  
  
  

  getLectureById$(id: number): Observable<Lecture | undefined> {
    return of(this.lectures.find((c) => c.id === id));
  }

  createLecture(payload: Lecture): Observable<Lecture[]>{
    this.lectures.push(payload);
    return of([...this.lectures]);
  }

  deleteLecture(lectureId: number): Observable<Lecture[]> {
    // Filtramos la lista de estudiantes para eliminar el estudiante con el ID especificado.
    this.lectures = this.lectures.filter((lecture) => lecture.id !== lectureId);

    // Devuelve la lista de estudiantes actualizada.
    return of(this.lectures);
  }


  editLecture$(id: number, payload: Lecture): Observable<Lecture[]> {
    return of(
      this.lectures.map((c) => (c.id === id ? { ...c, ...payload } : c))
    );
  }
}
