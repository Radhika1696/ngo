import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';
import { ShowUserCountPage } from './show-user-count.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShowUserCountPage
      }
    ]),
    TranslateModule.forChild(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9BxeSvt3u--Oj-_GD-qG2nPr1uODrR0Y'
    })
  ],
  declarations: [ShowUserCountPage]
})
export class ShowUserCountPageModule {}
