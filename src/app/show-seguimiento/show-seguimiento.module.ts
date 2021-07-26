import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowSeguimientoPageRoutingModule } from './show-seguimiento-routing.module';

import { ShowSeguimientoPage } from './show-seguimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowSeguimientoPageRoutingModule
  ],
  declarations: [ShowSeguimientoPage]
})
export class ShowSeguimientoPageModule {}
