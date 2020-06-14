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


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  donorList
  pincode = '0'
  donor_list

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
  }

  ngOnInit() {

    this.authservice.donor_list(this.pincode).subscribe((data) => {
      this.donorList = data
      console.log(this.donorList);
      this.donor_list = this.donorList.donor_list
      console.log(this.donor_list);


    })

  }

  async choose(ev) {
    const popup = await this.popCtrl.create({
      component: PopupPage,
      // componentProps: { fromto: fromto, search: this.search }
    });
    console.log(ev)
    return await popup.present();
  }

  goToHome() {
    this.navCtrl.navigateForward('home')
    this.router.navigate[('home')]
  }

  goToDonor() {
    this.navCtrl.navigateForward('donor-list')
    this.router.navigate(['donor-list']);
  }

  goToReceiver() {
    this.navCtrl.navigateForward('receiver-list')
    this.router.navigate[('receiver-list')]
  }

  goToRequest() {
    this.navCtrl.navigateForward('request')
    this.router.navigate[('request')]
  }

  goToAccount() {
    this.navCtrl.navigateForward('my-account')
    this.router.navigate[('my-account')]
  }


}