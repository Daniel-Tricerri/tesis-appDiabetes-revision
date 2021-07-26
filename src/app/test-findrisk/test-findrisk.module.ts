import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestFindriskPageRoutingModule } from './test-findrisk-routing.module';

import { TestFindriskPage } from './test-findrisk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestFindriskPageRoutingModule
  ],
  declarations: [TestFindriskPage]
})
export class TestFindriskPageModule {}
