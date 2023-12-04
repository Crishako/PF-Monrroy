export interface Course {
    id: number;
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
    clases: [] | null;
    descripcion: string;
  }