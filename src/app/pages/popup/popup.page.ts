import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { NavController, MenuController, LoadingController, ToastController, AlertController, PopoverController, NavParams, } from '@ionic/angular';
import { AuthService } from '../../auth.service'
import { LoginPage } from '../login/login.page';
import { ModalController } from '@ionic/angular';
// import { UsernameValidator } from './username.validator';
import { OtpPage } from '../otp/otp.page';
import { ReportAbusePage } from '../report-abuse/report-abuse.page';
import { ReportAbuseDonorPage } from '../report-abuse-donor/report-abuse-donor.page';



@Component({
  selector: 'app-popup',
  templateUrl: './popup.page.html',
  styleUrls: ['./popup.page.scss'],
})
export class PopupPage implements OnInit {
  donorList
  pincode = '0'
  donor_list
  id
  localstoragepincode
  localstorageid
  msg
  user_id
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private popCtrl: PopoverController,
    private params: NavParams

  ) {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.user_id = this.params.get('user_id')
    this.msg = this.params.get('msg')
    this.id = this.params.get('id')
    this.localstorageid = localStorage.getItem('id');
    this.pincode = this.params.get('pincode')
   
    this.localstoragepincode = localStorage.getItem('pincode');


    // this.authservice.donor_list(this.pincode).subscribe((data)=>{
    //   this.donorList=data
    //   console.log(this.donorList);
    //   this.donor_list=this.donorList.donor_list
    //   console.log( this.donor_list);


    // })

  }

  // async choose(ev,user_id,msg,id){
  //   const popup = await this.popCtrl.create({
  //     component: PopupPage,
  //     componentProps: { user_id:user_id, msg:msg,id:id }
  //   });
  //   console.log(ev)
  //   return await popup.present();
  // }

  async goToreportabuse() {
    if(localStorage.getItem('id')) {
    this.closeModal();
    const popup = await this.popCtrl.create({
      component: ReportAbuseDonorPage,
      componentProps: { user_id: this.user_id }
    });
    // console.log(ev)
    return await popup.present();
  }else{
    let msg = "Please login or register first"
    this.presentalert(msg);
  }
  }

  closeModal() {
    this.popCtrl.dismiss();
  }

  goTomessage() {
    if(localStorage.getItem('id')) {
    this.closeModal();
    this.navCtrl.navigateForward(`message/${this.user_id}`)
    }else{
      let msg = "Please login or register first"
      this.presentalert(msg);

    }
  }

  goToviewprofile() {
   if(localStorage.getItem('id')) {
    this.closeModal();
     this.navCtrl.navigateForward(`view-profile/${this.user_id}`)
   }else{
    let msg = "Please login or register first"
    this.presentalert(msg);
    // this.navCtrl.navigateForward('login')
    
   }

    //  this.navCtrl.navigateForward('login')
  }


  goTomarkreceived() {
    
    if(localStorage.getItem('id')) {
    this.closeModal();
    this.navCtrl.navigateForward(`mark-receiver-feedback/${this.id}`)
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
            this.closeModal();
            this.navCtrl.navigateForward('login')
            console.log('ok clicked');
          }
        }
      ]
    });
    await alert.present();
  }
}