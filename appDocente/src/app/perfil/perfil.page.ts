import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user:any;

  constructor(
    private DataService: DataService, 
    private NavController: NavController,
  ) { }

  ngOnInit() {
    this.user = this.DataService.getLoggedUser()[0];
  }

  goToModificarPerfil(){
    this.NavController.navigateForward('/modificar-perfil')
  }

  goBack(){
    this.NavController.back()
  }
}
