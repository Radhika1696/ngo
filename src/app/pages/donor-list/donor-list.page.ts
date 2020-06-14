import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { NavController, MenuController, LoadingController, ToastController, AlertController, PopoverController, } from '@ionic/angular';
import { AuthService } from '../../auth.service'
import { LoginPage } from '../login/login.page';
import { ModalController } from '@ionic/angular';
// import { UsernameValidator } from './username.validator';
import { OtpPage } from '../otp/otp.page';
import { PopupPage } from '../popup/popup.page';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-donor-list',
  templateUrl: './donor-list.page.html',
  styleUrls: ['./donor-list.page.scss'],
})
export class DonorListPage implements OnInit {
  donorList
  pincode = '0'
  pincode1
  localstoragepincode
  subscription: Subscription
  donor_list
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
    private translate : TranslateService

  ) {

  }

  ionViewWillEnter() {
    // this.translate.use('hi');
    this.menuCtrl.enable(false);
    this.get_donor_list();
  }

  ngOnInit() {

    this.localstoragepincode = localStorage.getItem('pincode');
    this.localstorageid = localStorage.getItem('id');

  }

  get_donor_list() {
    this.subscription = this.authservice.donor_list(this.pincode).subscribe((data) => {
      this.donorList = data
      console.log(this.donorList);
      this.donor_list = this.donorList.donor_list
      console.log(this.donor_list);
    })
  }

  async choose(ev, user_id, msg, id, pincode) {
    const popup = await this.popCtrl.create({
      component: PopupPage,
      componentProps: { user_id: user_id, msg: msg, id: id, pincode: pincode },
      backdropDismiss: true
    });
    console.log(ev)
    return await popup.present();
  }

  //search pincode wise
  updateList(ev) {
    console.log(ev.target.value);
    this.pincode1 += ev.target.value;
    console.log(this.pincode1)
    this.authservice.donor_list(ev.target.value).subscribe((data) => {
      this.donorList = data
      console.log(this.donorList);
      this.donor_list = this.donorList.donor_list
      console.log(this.donor_list);

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


}