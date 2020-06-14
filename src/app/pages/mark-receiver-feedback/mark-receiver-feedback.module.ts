import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { StarRatingModule } from 'ionic4-star-rating';

import { MarkReceiverFeedbackPage } from './mark-receiver-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: MarkReceiverFeedbackPage 
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
  declarations: [MarkReceiverFeedbackPage ]
})
export class MarkReceiverFeedbackPageModule {}
