import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, switchMap } from 'rxjs/operators'; // Asegúrate de importar `map` desde RxJS

import { IAsignatura } from '../interfaces/IAsignatura.interface';
import { IProfesor } from '../interfaces/IProfesor.interface';
import { IAlumno, IAlumnoPost } from '../interfaces/IAlumno.interface';
import { IJustificacion } from '../interfaces/IJustificacion.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private httpclient: HttpClient) { }

  // Guardar información del usuario en localStorage
  setLoggedUser(user: any) {
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  // Recuperar información del usuario
  getLoggedUser() {
    const user = localStorage.getItem('loggedUser');
    return user ? JSON.parse(user) : null;
  }

  // Eliminar la información del usuario (logout)
  clearLoggedUser() {
    localStorage.removeItem('loggedUser');
  }

   // Verificar si el usuario está logueado
   isUserLoggedIn(): boolean {
    return this.getLoggedUser() !== null;
  }

  // Obtener las asignaturas
  getAsignaturas(): Observable<IAsignatura[]> {
    return this.httpclient.get<IAsignatura[]>(`${environment.apiUrl}/asignaturas`);
  }



  // Obtener alumno por rut
  GetAlumnoByRut(rut:any):Observable<IAlumno>{
    return this.httpclient.get<IAlumno>(`${environment.apiUrl}/alumnos/?rut=${rut}`);
  }


  // Obtener asignatura por id
  getAsignaturaById(id:any):Observable<IAsignatura>{
    return this.httpclient.get<IAsignatura>(`${environment.apiUrl}/asignaturas/?id=${id}`)
  }

  // Actualiza el alumno con id
  updateAlumno(user: any): Observable<IAlumno> {
    return this.httpclient.put<IAlumno>(`${environment.apiUrl}/alumnos/${user.id}`, user);
  }

  // Obtener todas las asignaturas en las que está un alumno por su id
  getAsignaturasByAlumnoId(alumnoId: number): Observable<IAsignatura[]> {
    return this.getAsignaturas().pipe(
      map(asignaturas => asignaturas.filter(asignatura => asignatura.alumnos.includes(alumnoId)))
    ); 
  }

  // Obtener profesor por id
  GetProfesorById(rut:any):Observable<IProfesor>{
    return this.httpclient.get<IProfesor>(`${environment.apiUrl}/profesores/?id=${rut}`);
  }

  // Agrega justificacion a asignatura
  addJustificacion(asignaturaId: number, justificacion: any): Observable<IAsignatura> {
    return this.httpclient.get<IAsignatura>(`${environment.apiUrl}/asignaturas/${asignaturaId}`).pipe(
      switchMap((asignatura: IAsignatura) => {
        const justificaciones = asignatura.justificaciones || [];
  
        const existingJustificacionIndex = justificaciones.findIndex(j => j.alumno === justificacion.alumno);
  
        if (existingJustificacionIndex !== -1) {
          justificaciones[existingJustificacionIndex] = {
            ...justificaciones[existingJustificacionIndex],
            justificacion: justificacion.justificacion,
            comentario: justificacion.comentario || ""
          };
        } else {
          const nuevoId = (justificaciones.length > 0) ? (Math.max(...justificaciones.map(j => parseInt(j.id))) + 1).toString() : "1";
          
          const nuevaJustificacion = {
            id: nuevoId,
            alumno: justificacion.alumno,
            justificacion: justificacion.justificacion,
            comentario: justificacion.comentario || ""
          };
  
          justificaciones.push(nuevaJustificacion);
        }
  
        return this.httpclient.patch<IAsignatura>(`${environment.apiUrl}/asignaturas/${asignaturaId}`, {
          justificaciones: justificaciones
        });
      })
    );
  }
  
  getJustificacionesByAlumnoRut(rut: string): Observable<any[]> {
    return this.getAsignaturas().pipe(
      map(asignaturas => {
        const justificaciones: any[] = [];
        asignaturas.forEach(asignatura => {
          const justificadas = asignatura.justificaciones?.filter(just => just.alumno.toString() === rut);
          if (justificadas && justificadas.length > 0) {
            justificaciones.push(...justificadas.map(just => ({
              ...just,
              asignaturaid: asignatura.id,
              asignatura: asignatura.nombre,
              sala: asignatura.sala,
              horario: asignatura.horario
            })));
          }
        });
        return justificaciones;
      })
    );
  }

  addAlumno(alumno: IAlumnoPost): Observable<IAlumno> {
    return this.httpclient.post<IAlumno>(`${environment.apiUrl}/alumnos`, alumno);
  }

  eliminarJustificacion(asignaturaId: string, justificacionId: string): Observable<IAsignatura> {
    return this.httpclient.get<IAsignatura>(`${environment.apiUrl}/asignaturas/${asignaturaId}`).pipe(
      switchMap((asignatura: IAsignatura) => {
        // Filtrar las justificaciones para eliminar la que coincide con el id
        const justificacionesActualizadas = asignatura.justificaciones.filter(j => j.id !== justificacionId);

        // Actualizar la asignatura con las justificaciones restantes
        return this.httpclient.patch<IAsignatura>(`${environment.apiUrl}/asignaturas/${asignaturaId}`, {
          justificaciones: justificacionesActualizadas
        });
      })
    );
  }
}
