export interface IProfesor {
    id: number;
    rut: string;
    nombre: string;
    apellido: string;
    email: string;
    contraseña: string;
    activo: boolean;
  }

export interface IProfesorPost {
  rut: string;
  nombre: string;
  apellido: string;
  email: string;
  contraseña: string;
  activo: boolean;
}