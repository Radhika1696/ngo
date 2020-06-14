import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { StarRatingModule } from 'ionic4-star-rating';

import { MarkedReceiverPage } from './marked-receiver.page';

const routes: Routes = [
  {
    path: '',
    component: MarkedReceiverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StarRatingModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  declarations: [MarkedReceiverPage]
})
export class MarkedReceiverPageModule {}
