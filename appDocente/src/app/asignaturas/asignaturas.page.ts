import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {

  user:any;
  asignaturas:any;
  constructor(
    private DataService: DataService, 
    private NavController: NavController,
  ) { }

  ngOnInit() {
    this.user = this.DataService.getLoggedUser()[0];
    this.DataService.getAsignaturasProfesor(this.user.id).subscribe(resp =>{
      this.asignaturas = resp;
    })
    
  }
  
  goToAsignaturaDetalle(id: string) {
    this.NavController.navigateForward(['/asignatura-detalle'], {
      queryParams: { id }
    });
  }

  goBack(){
    this.NavController.back()
  }
}
