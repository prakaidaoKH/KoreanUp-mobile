import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FristpagePageRoutingModule } from './fristpage-routing.module';

import { FristpagePage } from './fristpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FristpagePageRoutingModule
  ],
  declarations: [FristpagePage]
})
export class FristpagePageModule {}
