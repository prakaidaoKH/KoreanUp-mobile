import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreApplyPageRoutingModule } from './pre-apply-routing.module';

import { PreApplyPage } from './pre-apply.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreApplyPageRoutingModule
  ],
  declarations: [PreApplyPage]
})
export class PreApplyPageModule {}
