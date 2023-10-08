import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendSlipPage } from './send-slip.page';

const routes: Routes = [
  {
    path: '',
    component: SendSlipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendSlipPageRoutingModule {}
