import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { NavController, MenuController, LoadingController, ToastController, AlertController, PopoverController, } from '@ionic/angular';
import { AuthService } from '../../auth.service'
import { LoginPage } from '../login/login.page';
import { ModalController } from '@ionic/angular';
// import { UsernameValidator } from './username.validator';
import { OtpPage } from '../otp/otp.page';
import { PopupPage } from '../popup/popup.page';
import { PopupReceiverPage } from '../popup-receiver/popup-receiver.page';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-receiver-list',
  templateUrl: './receiver-list.page.html',
  styleUrls: ['./receiver-list.page.scss'],
})
export class ReceiverListPage implements OnInit, OnDestroy {
  receiverList
  receiver_list
  pincode = '0'
  pincode1
  subscription: Subscription
  localstoragepincode
  localstorageid
  id
  msg
  values = '';
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private popCtrl: PopoverController,
    private router: Router
  ) {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.get_receiver_list();
  }

  ngOnInit() {
    this.localstoragepincode = localStorage.getItem('pincode');
    this.localstorageid = localStorage.getItem('id');
    // this.localstoragepincode = localStorage.getItem('pincode');


  }

  get_receiver_list() {
    this.subscription = this.authservice.receiver_list(this.pincode).subscribe((data) => {
      this.receiverList = data
      console.log(this.receiverList);
      this.receiver_list = this.receiverList.receiver_list
      console.log(this.receiver_list);
    })
  }

  async choose(ev, user_id, msg, id, pincode) {
    const popup = await this.popCtrl.create({
      component: PopupReceiverPage,
      componentProps: { user_id: user_id, msg: msg, id: id, pincode: pincode }
    });
    console.log(ev)
    return await popup.present();
  }

  updateList(ev) {
    console.log(ev.target.value);
    this.pincode1 += ev.target.value;
    console.log(this.pincode1)
    this.authservice.receiver_list(ev.target.value).subscribe((data) => {
      this.receiverList = data
      console.log(this.receiverList);
      this.receiver_list = this.receiverList.receiver_list
      console.log(this.receiver_list);
    })

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


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}