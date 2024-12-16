export interface IJustificacion {
  id: string; // ID de la justificación
  alumno: number; // ID del alumno
  justificacion: string; // Motivo de la justificación
  comentario: string; // Comentarios adicionales
}

export interface IAsignatura {
  id: string; // Cambiado de 'number' a 'string'
  nombre: string;
  sala: string;
  horario: string;
  profesor: number; // ID del profesor
  alumnos: number[]; // IDs de los alumnos
  imagePath: string;
  justificaciones: IJustificacion[]; // Nuevo campo agregado
}
