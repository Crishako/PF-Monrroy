export interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    token: string; // Puedes ajustar el tipo de token según la estructura real
    role: string;
  }

export interface UserPayload {
  courseId: number | null;
  userId: number | null;
}