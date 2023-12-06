export interface Course {
    id: number;
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
    clases: number[] | null;
    descripcion: string;
  }