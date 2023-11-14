import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { Lecture } from 'src/app/dashboard/models/lecture';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  private _lecture$ = new BehaviorSubject<Lecture | null>(null);

  public lecture$ = this._lecture$.asObservable();

  private apiUrl = "https://654bf2e15b38a59f28eff3b9.mockapi.io/api/v1";

  constructor(private http: HttpClient) { }

  private lectures: Lecture[] = [];
  
  getLectures(): Observable<Lecture[]> {
    return this.http.get<Lecture[]>(`${this.apiUrl}/lectures`).pipe(
      map((data) => {
        if (data) {
          this.lectures = data.map((clase: Lecture) => {
            const lecture: Lecture = {
              id: clase.id,
              nombre: clase.nombre,
              descripcion: clase.descripcion,
              profesor: clase.profesor,
              horario: clase.horario,
              calificaciones: clase.calificaciones
            }
            return lecture;
          }); // Usamos flat para aplanar la matriz de cursos
            return this.lectures
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

  createLecture(payload: Lecture): Observable<Lecture> {
    return this.http
      .post<Lecture>(
        `${this.apiUrl}/lectures`,
        {
          nombre: payload.nombre,
          profesor: payload.profesor,
          horario: payload.horario,
          descripcion: payload.descripcion,
          calificaciones: payload.calificaciones || {},
        }
      )
      .pipe(
        tap((lecture) => {
          this._lecture$.next(lecture);
          alert('Clase creado');
        }),
        catchError((err) => {
          alert('Error al crear la clase');
          throw err;
        })
      );
  }

  deleteLecture(lectureId: number): Observable<Lecture[]> {
    // Envía una solicitud DELETE al servidor para eliminar el estudiante con el ID especificado.
    return this.http
      .delete<Lecture[]>(`${this.apiUrl}/lectures/${lectureId}`)
      .pipe(
        catchError((err) => {
          // Puedes manejar el error según tus necesidades
          throw err;
        })
      );
  }


  

  editLecture$(id: number, payload: Lecture): Observable<Lecture[]> {
    return this.http
      .put<Lecture[]>(`${this.apiUrl}/lectures/${id}`, payload)
      .pipe(
        catchError((err) => {
          throw err;
        })
      );
  }
}
