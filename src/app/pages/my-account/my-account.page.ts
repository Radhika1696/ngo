import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { NavController, MenuController, LoadingController, ToastController, AlertController, PopoverController, } from '@ionic/angular';
import { AuthService } from '../../auth.service'
import { LoginPage } from '../login/login.page';
import { ModalController } from '@ionic/angular';
// import { UsernameValidator } from './username.validator';
import { OtpPage } from '../otp/otp.page';
import { PopupPage } from '../popup/popup.page';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core'


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {
  user_id = localStorage.getItem('id');
  lang
  localstorageid
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private popCtrl: PopoverController,
    private router: Router,
    private translate: TranslateService

  ) {

  }

  ionViewWillEnter() {
    
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.lang = localStorage.getItem('language');
    this.localstorageid = localStorage.getItem('id');


  }

  onChange(){
    console.log(this.lang);
    console.log('check')
    console.log(this.lang);
    localStorage.setItem("language", this.lang);
    this.translate.use(this.lang);
    //location.reload();
  }

  logout() {
    console.log('alo me ithe');
    // localStorage.clear();
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("pincode");
    this.navCtrl.navigateRoot('login');
  }

  goToEditPage() {
    this.navCtrl.navigateForward('edit-profile')
  }


  goTochangepassword() {
    this.navCtrl.navigateForward('changepassword');
  }


  goToviewprofile() {
    this.navCtrl.navigateForward('user-profile');
  }

  goToDonationList(){
    this.navCtrl.navigateForward('donation-list');
  }

  goToReceivedList(){
    this.navCtrl.navigateForward('received-list');
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





}