export interface Alumno {
  nombre: string;
  apellido: string;
  edad: number;
  curso: string;
  genero: string;
  calificaciones: {
    matematicas: number;
    historia: number;
    ciencias: number;
  };
  promedio: number;
}
