import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { NavController, MenuController, LoadingController, ToastController, AlertController, PopoverController, } from '@ionic/angular';
import { AuthService } from '../../auth.service'
import { LoginPage } from '../login/login.page';
import { ModalController } from '@ionic/angular';
// import { UsernameValidator } from './username.validator';
import { OtpPage } from '../otp/otp.page';
import { PopupPage } from '../popup/popup.page';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.page.html',
  styleUrls: ['./edit-request.page.scss'],
})
export class EditRequestPage implements OnInit {
  public requestForm: FormGroup;
  sendRequest
  type;
  user_data
  public data: any = {
    type: 'donor'
  };
  test
  user_type
  status
  msg
  submit
  localstoragepincode
  localstorageid
  request_id: any = this.route.snapshot.paramMap.get('id');
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
  private route:ActivatedRoute

  ) {

  }



  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  // onChangeHandler($event) {
  //   this.test = $event.target.value;
  // }

  onChangeHandler($event) {
    this.status = $event.target.value;
    console.log(this.status);

  }
  ngOnInit() {
    this.localstoragepincode = localStorage.getItem('pincode');
    this.localstorageid = localStorage.getItem('id');
    console.log(this.data.type)
    this.requestForm = this.formBuilder.group({

      'msg': [null, Validators.compose([
        Validators.required,

      ])],

    });

    this.authservice.view_request(this.request_id).subscribe((data) => {

      this.data = data
      this.user_data = this.data.request_details
      this.user_type = this.user_data.user_type;
      console.log(this.user_data);
console.log(this.user_data.user_type);

      if (this.user_data) {
        this.requestForm.patchValue({
         
          status:this.user_data.user_type,
         msg: this.user_data.msg,
    
        });
      }
    });

  }



  async showLoading(){
    let loading = await this.loadingCtrl.create({
        message: "Loading...",
        spinner: "bubbles"
    });
    loading.present();

    // setTimeout(() => {
    //     loading.dismiss();  
    // }, this.timeoutTime);
}

hideLoading(){
  this.loadingCtrl.dismiss();
}

  async request() {
    this.showLoading();
    console.log(this.data.type);

    console.log(this.requestForm.value)
    if (!this.requestForm.value.msg) {
      this.requestForm.controls['msg'].markAsTouched()
      this.submit = true;
    }




    else {
      console.log(this.requestForm.value)
    }


    this.msg = this.requestForm.get('msg').value,


      this.authservice.edit_request(this.request_id, this.msg).subscribe((data) => {
        this.sendRequest = data;
        this.hideLoading();
        console.log(this.sendRequest)



        if (this.sendRequest.success) {


          this.presentToast(this.sendRequest.success);
          this.requestForm.reset();
          this.navCtrl.navigateForward('home');


        }

        else {
          this.presentalert(this.sendRequest.error);
        }

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





  async presentToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: 'bottom',
      cssClass: "toast-scheme",
    });
    await toast.present();
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
    this.presentalert1(msg);
  }
  }

  goToAccount() {
    if(localStorage.getItem('id')) {
    this.navCtrl.navigateForward('my-account')
  }else{
    let msg = "Please login or register first"
    this.presentalert1(msg);
  }
  }

  async presentalert1(msg) {
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