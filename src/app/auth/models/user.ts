export interface User {
    id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    token: string; // Puedes ajustar el tipo de token según la estructura real
    rol: string;
    createdAt: string ;
  }