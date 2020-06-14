import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { NavController, MenuController, LoadingController, ToastController, AlertController, PopoverController, NavParams, } from '@ionic/angular';
import { AuthService } from '../../auth.service'
import { LoginPage } from '../login/login.page';
import { ModalController } from '@ionic/angular';
// import { UsernameValidator } from './username.validator';
import { OtpPage } from '../otp/otp.page';
import { ReportAbusePage } from '../report-abuse/report-abuse.page';



@Component({
  selector: 'app-popup-receiver',
  templateUrl: './popup-receiver.page.html',
  styleUrls: ['./popup-receiver.page.scss'],
})
export class PopupReceiverPage implements OnInit {
  donorList
  pincode = '0'
  localstoragepincode
  donor_list
  id
  msg
  user_id
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
    console.log(this.id);
    console.log(this.msg);



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
      component: ReportAbusePage,
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
  }
  }

  // goToreportabuse(){
  //   this.navCtrl.navigateForward(`report-abuse/${this.user_id}`)
  // }

  goTomarkdonated() {
    if(localStorage.getItem('id')) {
    this.closeModal();
    this.navCtrl.navigateForward(`mark-donate/${this.id}`)
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