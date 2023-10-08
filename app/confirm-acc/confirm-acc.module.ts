import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmAccPageRoutingModule } from './confirm-acc-routing.module';

import { ConfirmAccPage } from './confirm-acc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmAccPageRoutingModule
  ],
  declarations: [ConfirmAccPage]
})
export class ConfirmAccPageModule {}
