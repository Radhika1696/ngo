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
  selector: 'app-received-list',
  templateUrl: './received-list.page.html',
  styleUrls: ['./received-list.page.scss'],
})
export class ReceivedListPage implements OnInit {
  receiver_list
  receiverList
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
  
  }

  ngOnInit() {
    this.authservice.account_receiverList().subscribe((data)=>{
      this.receiverList=data     
      console.log(this.receiverList);
      this.receiver_list=this.receiverList.receiver_list
      console.log(this.receiver_list);
      
      
     })
   
  }

  goToEdit(id){
    console.log(id);
    
    this.navCtrl.navigateForward(`edit-request/${id}`)
  }

  goToMessage(user_id){
    console.log(user_id);
    this.navCtrl.navigateForward(`message/${user_id}`)
  }

  goToFeedback(id){
    console.log(id);
    
    this.navCtrl.navigateForward(`mark-donate/${id}`)
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
    this.navCtrl.navigateForward('request')
  }

  goToAccount() {
    this.navCtrl.navigateForward('my-account')
  }

 
}