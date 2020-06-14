import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Events, ModalController, PopoverController, NavParams, MenuController, Platform } from '@ionic/angular';
import { TranslateProvider, HotelProvider } from '../../providers';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-count',
  templateUrl: 'user-count.page.html',
  styleUrls: ['user-count.page.scss'],
})
export class UserCountPage implements OnInit {
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
  user_data
  subscription: any;
  backButtonSubscription;
  constructor(
    public navCtrl: NavController,
    // public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private translate: TranslateProvider,
    public hotels: HotelProvider,
    public events: Events,
    private authservice: AuthService,
    private router: Router,
    public menuCtrl: MenuController,
    private platform: Platform,
  ) {


  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.authservice.user_count(this.user).subscribe
      ((data) => {
        console.log(data)
        this.user_data = data
      })
  }

  register() {
    this.navCtrl.navigateForward('register')
  }
  // ionViewWillEnter() {
  //   this.menuCtrl.enable(true);
  // }

  goToLogin() {
    this.navCtrl.navigateForward('login')
  }

  goToDonor() {
    this.navCtrl.navigateForward('register')
  }

  goToReceiver() {
    this.navCtrl.navigateForward('register')
  }
}
