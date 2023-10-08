import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LearnOnePageRoutingModule } from './learn-one-routing.module';

import { LearnOnePage } from './learn-one.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LearnOnePageRoutingModule
  ],
  declarations: [LearnOnePage]
})
export class LearnOnePageModule {}
