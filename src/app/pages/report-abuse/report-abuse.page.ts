import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { NavController, MenuController, LoadingController, ToastController, AlertController, PopoverController, NavParams, } from '@ionic/angular';
import { AuthService } from '../../auth.service'
import { LoginPage } from '../login/login.page';
import { ModalController } from '@ionic/angular';
// import { UsernameValidator } from './username.validator';
import { OtpPage } from '../otp/otp.page';
import { PopupPage } from '../popup/popup.page';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-report-abuse',
  templateUrl: './report-abuse.page.html',
  styleUrls: ['./report-abuse.page.scss'],
})
export class ReportAbusePage implements OnInit {
  request_id: any = this.params.get('user_id');
  donorList
  pincode = '0'
  donor_list
  id
  msg
  report

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private popCtrl: PopoverController,
    private route: ActivatedRoute,
    private params: NavParams

  ) {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.closeModal();
    this.authservice.report_abuse(this.request_id).subscribe((data) => {
      this.report = data
      console.log(this.report);
      this.msg = this.report.success



      // if (this.report.success) {

      //   this.presentalert(this.report.success);

      // }

      // else {
      //   this.presentalert(this.data1.error);
      // }
    })
  }


  async presentalert(error) {
    let alert = await this.alertCtrl.create({
      header: 'Caution',
      message: error,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ok',
          handler: () => {
            console.log('ok clicked');
          }
        }
      ]
    });
    await alert.present();
  }

  //  async choose(ev,user_id,msg,id){
  //   const popup = await this.popCtrl.create({
  //     component: PopupPage,
  //     componentProps: { user_id:user_id, msg:msg,id:id }
  //   });
  //   console.log(ev)
  //   return await popup.present();
  // }


  closeModal() {
    this.popCtrl.dismiss();
  }


  home() {
    this.navCtrl.navigateForward('home');
  }

  donor() {
    this.navCtrl.navigateForward('donor-list');
  }

  receiver() {
    this.navCtrl.navigateForward('receiver-list');
  }

}