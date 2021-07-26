import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowRecomendacionesPageRoutingModule } from './show-recomendaciones-routing.module';

import { ShowRecomendacionesPage } from './show-recomendaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowRecomendacionesPageRoutingModule
  ],
  declarations: [ShowRecomendacionesPage]
})
export class ShowRecomendacionesPageModule {}
