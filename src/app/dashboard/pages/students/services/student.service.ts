import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map} from 'rxjs';
import { Alumno } from 'src/app/dashboard/models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Alumno[]> {
    return this.http.get<any>('../../../assets/data/alumnos.json').pipe(
      map((data) => {
        if (data && data.alumnos && Array.isArray(data.alumnos)) {
          return data.alumnos.map((alumno: Alumno) => {
            return {
              nombreCompleto: `${alumno.nombre} ${alumno.apellido}`,
              edad: alumno.edad,
              curso: alumno.curso,
              genero: alumno.genero,
              calificaciones: alumno.calificaciones
              // Puedes realizar más transformaciones aquí
            };
          });
        } else {
          console.error('Los datos no tienen la estructura esperada.');
          return []; // Devolver una matriz vacía o realizar otro manejo de errores aquí.
        }
      })
    );
  }

}
