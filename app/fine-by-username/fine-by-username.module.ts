import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FineByUsernamePageRoutingModule } from './fine-by-username-routing.module';

import { FineByUsernamePage } from './fine-by-username.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FineByUsernamePageRoutingModule
  ],
  declarations: [FineByUsernamePage]
})
export class FineByUsernamePageModule {}
