import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/tabs/test',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'test',
        loadChildren: () => import('../test-findrisk/test-findrisk.module').then(m => m.TestFindriskPageModule)
      },
      {
        path: 'recomendaciones',
        loadChildren: () => import('../recomendaciones/recomendaciones.module').then(m => m.RecomendacionesPageModule)
      },
      {
        path: 'seguimiento',
        loadChildren: () => import('../seguimiento/seguimiento.module').then(m => m.SeguimientoPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
