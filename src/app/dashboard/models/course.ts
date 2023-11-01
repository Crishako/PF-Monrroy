import { Lecture } from "./lecture";
export interface Course {
    id: number;
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
    clases: Lecture[];
    descripcion: string;
  }