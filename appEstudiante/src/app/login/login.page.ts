import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../services/data.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  userdata:any;

  constructor(
    private FormBuilder: FormBuilder,
    private DataService: DataService,
    private AlertController: AlertController,
    private NavController: NavController
  ) { 
      this.loginForm = this.FormBuilder.group({
        rut: ['', [Validators.required]],
        password: ['', [Validators.required]]
      })
    }

  ngOnInit() {
  }

  async alerta(message: string) {
    const alert = await this.AlertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  login(){
    if (!this.loginForm.valid){
      return;
    }
    const rut = this.loginForm.value.rut;
    const password = this.loginForm.value.password;

    this.DataService.GetAlumnoByRut(rut).subscribe(resp =>{
      this.userdata = resp;

      if (this.userdata.length === 0) {
        this.loginForm.reset();
        this.alerta('El usuario no existe');
        return;
      }
      if (this.userdata[0].contraseña != password) {
        this.loginForm.reset();
        this.alerta('La contraseña ingresada es incorrecta'); 
        return;
      }
      if (!this.userdata[0].activo) {
        this.loginForm.reset();
        this.alerta('El usuario actual no esta activo, contacta a un administrador');
        return;
      }
      this.DataService.setLoggedUser(this.userdata);
      this.loginForm.reset();
      this.NavController.navigateForward('/inicio')
    })

  }

}
