import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IAlumnoPost } from '../interfaces/IAlumno.interface';
import { DataService } from '../services/data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registerForm: FormGroup;
  alumno!: IAlumnoPost;
  userdata: any;
  userdata2: any;
  

  constructor(
    private NavController: NavController,
    private DataService: DataService,
    private formBuilder: FormBuilder,
    private alertcontroller: AlertController,
  ) {
    this.registerForm = this.formBuilder.group({
      rut: ['', [
        Validators.required, 
        Validators.minLength(9), 
        Validators.maxLength(9),
        Validators.pattern('^[0-9]*$')
      ]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  goBack() {
    this.NavController.back();
  }

  register() {
    if (!this.registerForm.valid) {
      this.mostrarAlerta('Error', 'Introduce la información necesaria');
      return;
    }
  
    const { password, password2, rut, nombre, apellido, email } = this.registerForm.value;
  
    if (password !== password2) { 
      this.mostrarAlerta('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (rut.toString().length !== 9) {
      this.mostrarAlerta('Error', 'El RUT debe tener exactamente 9 dígitos');
      return;
    }
  
    this.DataService.GetAlumnoByRut(rut).subscribe(respu => {
      this.userdata2 = respu;
  
      if (this.userdata2.length !== 0) {
        this.mostrarAlerta('Error', 'El rut de usuario ya existe');
        return;
      }
  
      this.DataService.GetAlumnoByRut(rut).subscribe(resp => {
        this.userdata = resp;
  
        if (this.userdata.length !== 0) {
          this.mostrarAlerta('Error', 'El nombre de usuario ya existe');
          return;
        } 
        this.alumno = {
          rut: rut.toString(),
          nombre,
          apellido,
          email,
          contraseña: password,
          activo: true,
        };

        this.DataService.addAlumno(this.alumno).subscribe(response => {
          this.mostrarAlerta('Éxito', 'Usuario registrado con éxito');
          this.registerForm.reset();
          this.NavController.navigateForward('/login');
        }, error => {
          this.mostrarAlerta('Error', 'Hubo un error al registrar el usuario');
        });
      }, error => {
        this.mostrarAlerta('Error', 'Hubo un error al comprobar el nombre de usuario');
      });
    }, error => {
      this.mostrarAlerta('Error', 'Hubo un error al comprobar el RUT');
    });
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertcontroller.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
