import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NavController } from '@ionic/angular';
import { IAsignatura } from '../interfaces/IAsignatura.interface';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {

  user: any;
  asignaturas: IAsignatura[] = [];
  profesores: any = {}; 
  aux:any;
  modalData: any = null;
  isModalOpen: boolean = false;
  qrData!: string;

  constructor(
    private DataService: DataService, 
    private NavController: NavController,
  ) { }

  ngOnInit() {
    this.user = this.DataService.getLoggedUser()[0];
    this.DataService.getAsignaturasByAlumnoId(Number(this.user.id)).subscribe(resp => {
      this.asignaturas = resp;
      this.asignaturas.forEach((asignatura: IAsignatura) => {  
        this.getProfesorById(asignatura.profesor); 
      });
    });
  }

  getProfesorById(id: any) {
    this.DataService.GetProfesorById(id).subscribe(resp => {
      this.aux = resp;
      this.profesores[id] = this.aux[0];
    });
  }

  openModal(asignatura: any) {    
    this.qrData = this.concatenarCadenas( asignatura.id, new Date().toLocaleDateString(), String(asignatura.profesor), this.user.rut, this.user.email )
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  concatenarCadenas(...cadenas: string[]): string {
    return cadenas
      .filter((cadena: string) => typeof cadena === 'string' && cadena.trim() !== "")
      .map(cadena => cadena.trim())
      .join(", ");
  }

  goToJustificacion(asignatura: any){
    this.NavController.navigateForward(['/justificacion'], {
      queryParams: { data: JSON.stringify(asignatura) }
    });
  }
  
}
