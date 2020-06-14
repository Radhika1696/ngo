import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, LoadingController, Events, AlertController, Platform } from '@ionic/angular';
import { TranslateProvider, HotelProvider } from '../../providers';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core'
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  openMenu: Boolean = false;
  user_data
  user
  localstoragepincode
  lang
 
  subscription: any;
  backButtonSubscription;
  localstorageid = localStorage.getItem('id');
  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    // private translate: TranslateProvider,
    public hotels: HotelProvider,
    public events: Events,
    private authservice: AuthService,
    private router: Router,
    private photoViewer: PhotoViewer,
    private alertCtrl:AlertController,
    private translate: TranslateService
  ) {


  }

  ngOnInit() {
    this.localstoragepincode = localStorage.getItem('pincode');
    this.localstorageid = localStorage.getItem('id');
    console.log(this.localstorageid);

    this.authservice.user_count(this.user).subscribe
      ((data) => {
        console.log(data)
        this.user_data = data
      })
  }

  onChange(){
    console.log(this.lang);
    console.log('check')
    console.log(this.lang);
    localStorage.setItem("language", this.lang);
    this.translate.use(this.lang);
    //location.reload();
  }


  ionViewWillEnter() {
    this.menuCtrl.enable(true);

  }

  userlist() {

    this.navCtrl.navigateForward(`user-list`);

  }


  editprofile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }

  goToWalk() {
    this.navCtrl.navigateRoot('walkthrough');
  }

  // logout() {
  //   this.navCtrl.navigateRoot('login');
  // }

  register() {
    this.navCtrl.navigateForward('register');
  }

  messages() {
    this.navCtrl.navigateForward('messages');
  }

  goToHome() {
    this.navCtrl.navigateForward('home')
    
  }

  goToDonor() {
    this.navCtrl.navigateForward('donor-list')
   
  }

  goToReceiver() {
    this.navCtrl.navigateForward('receiver-list')
   
  }

  // tempfunction(){
  //   this.navCtrl.navigateForward('walkthrough')

  // }
  goToRequest() {
    if(localStorage.getItem('id')) {
    this.navCtrl.navigateForward('request')
    
  }else{
    let msg = "Please login or register first"
    this.presentalert(msg);
  }
  }

  goToAccount() {
    if(localStorage.getItem('id')) {
    this.navCtrl.navigateForward('my-account')
  }else{
    let msg = "Please login or register first"
    this.presentalert(msg);
  }
  }

  async presentalert(msg) {
    let alert = await this.alertCtrl.create({
      header: 'Caution',
      message: msg,
      buttons: [
        {
          text: 'ok',
          handler: () => {
        
            this.navCtrl.navigateForward('login')
            console.log('ok clicked');
          }
        }
      ]
    });
    await alert.present();
  }

  viewimg() {
    this.photoViewer.show('assets/img/howworks.jpg', 'How It Works', {share: false});


  }

  logout() {
    console.log('alo me ithe');
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("pincode");
    // localStorage.clear();
    this.navCtrl.navigateRoot('login');
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
      // this.navCtrl.pop();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
}
