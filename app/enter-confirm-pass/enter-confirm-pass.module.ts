import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterConfirmPassPageRoutingModule } from './enter-confirm-pass-routing.module';

import { EnterConfirmPassPage } from './enter-confirm-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterConfirmPassPageRoutingModule
  ],
  declarations: [EnterConfirmPassPage]
})
export class EnterConfirmPassPageModule {}
