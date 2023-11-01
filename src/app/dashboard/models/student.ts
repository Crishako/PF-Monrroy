import { Course } from "./course";
export interface Student {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  genero: string;
  email: string;
  cursos: Course[];
}


