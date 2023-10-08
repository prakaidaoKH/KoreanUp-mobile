import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmAccPage } from './confirm-acc.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmAccPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmAccPageRoutingModule {}
