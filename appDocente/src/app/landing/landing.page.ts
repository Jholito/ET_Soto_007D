import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  public swiper!: Swiper;
  
  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  goToLogin() {
    this.navController.navigateForward('/login');
  }

  goToRegistro() {
    this.navController.navigateForward('/registro'); 
  }

}
