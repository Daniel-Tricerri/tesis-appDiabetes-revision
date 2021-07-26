import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowSeguimientoPage } from './show-seguimiento.page';

const routes: Routes = [
  {
    path: '',
    component: ShowSeguimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowSeguimientoPageRoutingModule {}
