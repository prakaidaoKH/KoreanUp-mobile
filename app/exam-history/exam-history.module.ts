import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamHistoryPageRoutingModule } from './exam-history-routing.module';

import { ExamHistoryPage } from './exam-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExamHistoryPageRoutingModule,
  ],
  declarations: [ExamHistoryPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExamHistoryPageModule {}
