import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearnOnePage } from './learn-one.page';

const routes: Routes = [
  {
    path: '',
    component: LearnOnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnOnePageRoutingModule {}
