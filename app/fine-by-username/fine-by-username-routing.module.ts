import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FineByUsernamePage } from './fine-by-username.page';

const routes: Routes = [
  {
    path: '',
    component: FineByUsernamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FineByUsernamePageRoutingModule {}
