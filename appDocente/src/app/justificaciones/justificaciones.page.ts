import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { IAsignatura } from '../interfaces/IAsignatura.interface';
import { IAlumno } from '../interfaces/IAlumno.interface';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-justificaciones',
  templateUrl: './justificaciones.page.html',
  styleUrls: ['./justificaciones.page.scss'],
})
export class JustificacionesPage implements OnInit {

  user: any;
  aux:any;
  asignaturaId!: string ;
  asignatura!: any;
  justificaciones!:any;
  alumnos: any = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private DataService: DataService,
    private NavController: NavController

  ) {}

  ngOnInit() {
    this.user = this.DataService.getLoggedUser()[0];
    this.activatedRoute.queryParams.subscribe(params => {
      this.asignaturaId = params['id'];
      this.DataService.getAsignaturaById(this.asignaturaId).subscribe(resp =>{
        this.asignatura = resp;
        console.log(this.asignatura)
      })
    });
  }

  goBack(){
    this.NavController.back()
  }

}
