export interface User {
    id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    token: string; // Puedes ajustar el tipo de token según la estructura real
    createdAt: string ;
    updatedAt: number | null; // Puedes ajustar el tipo según lo que represente la propiedad
    deletedAt: number | null; // Puedes ajustar el tipo según lo que represente la propiedad
  }