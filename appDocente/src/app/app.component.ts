import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DataService } from './services/data.service';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoggedIn = false;

  constructor(
    private navController: NavController,
    private dataService: DataService,
    private alertController: AlertController
  ) {}

  navigateTo(page: string) {
    this.navController.navigateRoot(`/${page}`);
  }

  logout() {
    this.dataService.clearLoggedUser();
    this.alerta('Has cerrado sesión.');
    this.navController.navigateForward(['/landing']);
  }

  async alerta(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
    this.isLoggedIn = this.dataService.isUserLoggedIn();
  }
}
