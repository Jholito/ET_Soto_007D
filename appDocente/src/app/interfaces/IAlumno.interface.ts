export interface IAlumno {
  id: number;
  rut: string;
  nombre: string;
  apellido: string;
  email: string;
  contraseña: string;
  activo: boolean;
}

//post
export interface IAlumnoPost{
rut: string;
nombre: string;
apellido: string;
email: string;
contraseña: string;
activo: boolean;
}