import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { IAsignatura } from '../interfaces/IAsignatura.interface';
import { IAlumno } from '../interfaces/IAlumno.interface';
import { NavController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-asignatura-detalle',
  templateUrl: './asignatura-detalle.page.html',
  styleUrls: ['./asignatura-detalle.page.scss'],
})
export class AsignaturaDetallePage implements OnInit {
  user: any;
  aux:any;
  asignaturaId!: string ;
  asignatura!: any;
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
        this.asignatura[0].alumnos.forEach((alumno:IAlumno) => {
          this.getAlumnoById(alumno)          
        });
      })
    });
  }

  getAlumnoById(id:any){
    this.DataService.GetAlumnoById(id).subscribe(resp =>{
      this.aux = resp;
      this.alumnos[id] = this.aux[0];
    })
  }

  goToJustificaciones(id: string) {
    this.NavController.navigateForward(['/justificaciones'], {
      queryParams: { id }
    });
  }

  goBack(){
    this.NavController.back()
  }

  async scanQRCode() {
    try {
      // Verifica si se tienen los permisos necesarios
      const permission = await BarcodeScanner.checkPermission({ force: true });
      if (!permission.granted) {
        console.error('Permiso no concedido para usar la cámara');
        return;
      }
  
      // Oculta la webview para mostrar solo la cámara
      document.body.classList.add('scanner-active');
  
      // Inicia el escaneo
      const result = await BarcodeScanner.startScan();
  
      // Detén el escáner y muestra la vista de la app nuevamente
      document.body.classList.remove('scanner-active');
  
      if (result.hasContent) {
        console.log('QR Detectado:', result.content);
  
        // Guarda el contenido del QR
        this.saveScannedData(result.content);
      } else {
        console.error('No se detectó contenido en el QR');
      }
    } catch (error) {
      console.error('Error al escanear el código QR:', error);
      document.body.classList.remove('scanner-active');
    } finally {
      // Siempre asegura detener el escáner
      BarcodeScanner.stopScan();
    }
  }
  
  saveScannedData(content: string) {
    // Guarda el contenido escaneado
    console.log('Contenido del QR:', content);
    // Aquí puedes almacenar los datos en una variable o procesarlos como necesites
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    BarcodeScanner.showBackground(); // Restaura la vista web si se ocultó antes
  }
  
}
