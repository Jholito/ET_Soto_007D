import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NavController } from '@ionic/angular';
import { IProfesor } from '../interfaces/IProfesor.interface';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  user: any;
  constructor(
    private DataService: DataService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.user = this.DataService.getLoggedUser();
  }

  ionViewWillEnter() {
    // Recargar datos del usuario cada vez que la página sea activada
    this.user = this.DataService.getLoggedUser()[0];
  }

  goToAsignaturas(){
    this.navController.navigateForward('asignaturas')
  }

  goToPerfil(){
    this.navController.navigateForward('perfil')
  }

}
