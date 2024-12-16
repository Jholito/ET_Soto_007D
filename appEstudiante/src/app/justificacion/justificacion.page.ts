import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-justificacion',
  templateUrl: './justificacion.page.html',
  styleUrls: ['./justificacion.page.scss'],
})
export class JustificacionPage implements OnInit {

  user: any;
  form: FormGroup;
  asignatura!: any ;
  /* justificacion = {
    alumno: null,
    justificacion: '',
    comentario: ''
  }; */

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private DataService: DataService,
    private FormBuilder: FormBuilder,
    private NavController: NavController,
    private AlertController: AlertController,
  ) {
    this.form = this.FormBuilder.group({
      alumno: [''], 
      justificacion: ['', [Validators.required]], 
      comentario: ['']
    });
  }

  ngOnInit() {
    this.user = this.DataService.getLoggedUser()[0];
    this.form.patchValue({
      alumno: this.user.rut
    });
  
    this.ActivatedRoute.queryParams.subscribe(params => {
      this.asignatura = JSON.parse(params['data']);
    });
  }
  

  onSubmit() {
    if (!this.form.valid){
      return;
    }

    this.DataService.addJustificacion(this.asignatura.id, this.form.value).subscribe(updatedAsignatura => {
    });
    this.form.reset;
    this.alerta('Asistencia Justificada')
    this.NavController.navigateForward('/asignaturas')
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
