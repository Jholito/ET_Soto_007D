import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-justificaciones',
  templateUrl: './justificaciones.page.html',
  styleUrls: ['./justificaciones.page.scss'],
})
export class JustificacionesPage implements OnInit {

  user: any;
  justificaciones: any;

  constructor(
    private DataService: DataService, 
    private NavController: NavController,
    private AlertController:AlertController,
  ) { }

  ngOnInit() {
    this.user = this.DataService.getLoggedUser()[0];
    this.DataService.getJustificacionesByAlumnoRut(this.user.rut).subscribe(
      (data: any[]) => {
        this.justificaciones = data;
        console.log(this.justificaciones)
      },
      (error) => {
        console.error('Error al obtener las justificaciones:', error);
      }
    );
  }

  eliminarJustificacion(asignaturaId: string, justificacionId: string) {
    this.DataService.eliminarJustificacion(asignaturaId, justificacionId).subscribe(
      (asignatura) => {
        // Operación exitosa
        this.alerta('Justificación eliminada correctamente');
        window.location.reload();
      },
      (error) => {
        // Manejo de errores
        this.alerta('Hubo un problema al eliminar la justificación');
        console.error(error);
      }
    );
  }

  async alerta(message: string) {
    const alert = await this.AlertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
