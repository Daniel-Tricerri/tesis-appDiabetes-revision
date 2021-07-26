import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'test-findrisk',
    loadChildren: () => import('./test-findrisk/test-findrisk.module').then( m => m.TestFindriskPageModule)
  },
  {
    path: 'recomendaciones',
    loadChildren: () => import('./recomendaciones/recomendaciones.module').then( m => m.RecomendacionesPageModule)
  },
  {
    path: 'seguimiento',
    loadChildren: () => import('./seguimiento/seguimiento.module').then( m => m.SeguimientoPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'acerca',
    loadChildren: () => import('./acerca/acerca.module').then( m => m.AcercaPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'show-recomendaciones',
    loadChildren: () => import('./show-recomendaciones/show-recomendaciones.module').then( m => m.ShowRecomendacionesPageModule)
  },
  {
    path: 'show-seguimiento',
    loadChildren: () => import('./show-seguimiento/show-seguimiento.module').then( m => m.ShowSeguimientoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
