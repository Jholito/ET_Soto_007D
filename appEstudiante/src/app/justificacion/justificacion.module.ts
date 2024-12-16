import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JustificacionPageRoutingModule } from './justificacion-routing.module';

import { JustificacionPage } from './justificacion.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    JustificacionPageRoutingModule
  ],
  declarations: [JustificacionPage]
})
export class JustificacionPageModule {}
