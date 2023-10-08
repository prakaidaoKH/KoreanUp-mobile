import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExamPageRoutingModule } from './exam-routing.module';
import { ExamPage } from './exam.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ExamPageRoutingModule],
  declarations: [ExamPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExamPageModule {}
