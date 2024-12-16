import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IAsignatura } from '../interfaces/IAsignatura.interface';
import { IProfesor, IProfesorPost } from '../interfaces/IProfesor.interface';
import { IAlumno } from '../interfaces/IAlumno.interface';

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

  // Obtener profesor por rut
  GetProfesorByRut(rut:any):Observable<IProfesor>{
    return this.httpclient.get<IProfesor>(`${environment.apiUrl}/profesores/?rut=${rut}`);
  }

  // Obtener asignaturas de un profesor
  getAsignaturasProfesor(id:any):Observable<IAsignatura>{
    return this.httpclient.get<IAsignatura>(`${environment.apiUrl}/asignaturas/?profesor=${id}`)
  }

  // Obtener asignatura por id
  getAsignaturaById(id:any):Observable<IAsignatura>{
    return this.httpclient.get<IAsignatura>(`${environment.apiUrl}/asignaturas/?id=${id}`)
  }

  // Actualiza el profesor con id
  updateProfesor(user: any): Observable<IProfesor> {
    return this.httpclient.put<IProfesor>(`${environment.apiUrl}/profesores/${user.id}`, user);
  }

  // Obtener alumno por rut
  GetAlumnoById(id:any):Observable<IAlumno>{
    return this.httpclient.get<IAlumno>(`${environment.apiUrl}/alumnos/?id=${id}`);
  }

  addProfesor(profesor: IProfesorPost): Observable<IProfesorPost> {
    return this.httpclient.post<IProfesorPost>(`${environment.apiUrl}/profesores`, profesor);
  }

}
