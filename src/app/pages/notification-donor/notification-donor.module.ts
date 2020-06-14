import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotificationDonorPage } from './notification-donor.page';
// import { TabsPage } from '../tabs/tabs.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationDonorPage
  },
  // { path: 'tabs', pathMatch: 'full', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  // {
  //   path: 'tabs',
  //   redirectTo: '/tabs/(home:home)',
  //   component: TabsPage
  // }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NotificationDonorPage]
})
export class NotificationDonorPageModule {}
