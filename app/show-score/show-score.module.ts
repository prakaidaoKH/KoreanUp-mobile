import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowScorePageRoutingModule } from './show-score-routing.module';

import { ShowScorePage } from './show-score.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowScorePageRoutingModule
  ],
  declarations: [ShowScorePage]
})
export class ShowScorePageModule {}
