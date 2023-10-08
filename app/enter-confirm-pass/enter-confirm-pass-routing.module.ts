import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterConfirmPassPage } from './enter-confirm-pass.page';

const routes: Routes = [
  {
    path: '',
    component: EnterConfirmPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterConfirmPassPageRoutingModule {}
