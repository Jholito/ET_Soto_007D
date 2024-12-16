import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {

  user: any;

  constructor(
    private DataService: DataService, 
    private NavController: NavController,
    private AlertController: AlertController,
  ) { }

  ngOnInit() {
    this.user = this.DataService.getLoggedUser()[0];
  }

  guardarCambios() {
    const usuario = Array.isArray(this.user) ? this.user[0] : this.user;
    this.DataService.updateProfesor(usuario).subscribe(
      (response) => {
        this.DataService.setLoggedUser(response);
        this.logout()
      },
      (error) => {
        console.error('Error al actualizar el usuario:', error);
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

  logout() {
    this.DataService.clearLoggedUser();
    this.alerta('Usuario modificado con exito, vuelve a iniciar sesión.');
    window.location.href = '/landing';
  }

  goBack(){
    this.NavController.back()
  }

}
