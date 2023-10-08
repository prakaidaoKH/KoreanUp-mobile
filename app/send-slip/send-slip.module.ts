import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendSlipPageRoutingModule } from './send-slip-routing.module';

import { SendSlipPage } from './send-slip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendSlipPageRoutingModule
  ],
  declarations: [SendSlipPage]
})
export class SendSlipPageModule {}
