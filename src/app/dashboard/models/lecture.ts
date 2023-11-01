export interface Lecture {
    id: number;
    nombre: string;
    profesor: string;
    horario: string;
    descripcion: string;
    calificaciones:{
      "certamen1": number,
      "certamen2": number,
      "certamen3": number,
      "examen": number
    },
  }
  
  