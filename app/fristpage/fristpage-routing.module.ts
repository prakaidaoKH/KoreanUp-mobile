import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FristpagePage } from './fristpage.page';

const routes: Routes = [
  {
    path: '',
    component: FristpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FristpagePageRoutingModule {}
