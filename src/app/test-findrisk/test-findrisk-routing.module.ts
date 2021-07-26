import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestFindriskPage } from './test-findrisk.page';

const routes: Routes = [
  {
    path: '',
    component: TestFindriskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestFindriskPageRoutingModule {}
