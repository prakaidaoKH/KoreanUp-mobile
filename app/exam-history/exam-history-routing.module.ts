import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamHistoryPage } from './exam-history.page';

const routes: Routes = [
  {
    path: '',
    component: ExamHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamHistoryPageRoutingModule {}
