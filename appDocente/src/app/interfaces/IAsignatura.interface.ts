export interface IAsignatura {
    id: number;
    nombre: string;
    sala: string;
    horario: string;
    profesor: number; // ID del profesor
    alumnos: number[]; // IDs de los alumnos
  }