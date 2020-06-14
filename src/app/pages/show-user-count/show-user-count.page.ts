import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, LoadingController,   Events} from '@ionic/angular';
import { TranslateProvider, HotelProvider } from '../../providers';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-user-count',
  templateUrl: 'show-user-count.page.html',
  styleUrls: ['show-user-count.page.scss'],
})
export class ShowUserCountPage implements OnInit{
  user
  openMenu: Boolean = false;
  dashboard_data
  dashboard_data_details
  dashboard_data_recording
  dashboard_data_live
  dashboard_view
  live_list
  view_all_live_list
  recording_list
  view_all_recording_list

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private translate: TranslateProvider,
    public hotels: HotelProvider,
    public events: Events,
    private authservice:AuthService,
    private router: Router
  ) {
  
   
  }

  ngOnInit(){
// this.authservice.user_count(this.user).subscribe
// ((data)=>{
//   console.log(data)
// })
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }



}
