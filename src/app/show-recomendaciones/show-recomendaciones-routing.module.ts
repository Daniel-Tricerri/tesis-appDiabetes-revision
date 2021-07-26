import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowRecomendacionesPage } from './show-recomendaciones.page';

const routes: Routes = [
  {
    path: '',
    component: ShowRecomendacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowRecomendacionesPageRoutingModule {}
