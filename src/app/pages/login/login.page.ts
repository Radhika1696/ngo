import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Events, NavController, MenuController, ToastController, AlertController, LoadingController, Platform } from '@ionic/angular';
import { TranslateProvider } from '../../providers';
import { AuthService } from '../../auth.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { HomePage } from '../home/home.page';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
  username
  user_data
  parent_id
  id
  tokennew
  error
  password
  full_name
  data1
  submit;
  email;
 
  familyName: any;
  givenName: any;
  userId: any;
  subscription: any;
  backButtonSubscription;
  gcm_id: any;
  user_id: '1'
  request_id: '1'
  Userdata
  userLogin
  userLogindata
  Userdatagoogle: any;
  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private translate: TranslateProvider,
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private altCtrl: AlertController,
    public events: Events,
    private googleplus : GooglePlus,
    private fcm: FCM,
    public localNotifications: LocalNotifications,
    private router: Router
  ) {
    platform.ready().then(() => {
      this.fcm.getToken().then(token => {
        console.log(token);
        this.gcm_id = token;
      });

      // this.fcm.onNotification().subscribe(data => {
      //   console.log('fb start');
      //   console.log(data);

      //   const messageobj = JSON.parse(data.message);
      //   const type = messageobj.type;

      //   console.log('fb end');
      //   if(data.wasTapped){
      //    if(type=='donation_receiver'){
      //      console.log(type);
      //     const donor_id = messageobj.id;
      //     console.log(data.message.id);
      //     console.log('donation');

      //     this.router.navigateByUrl(`marked-receiver/${donor_id}`);
      //    }
      //    if(data.type=='admin'){
      //     console.log(type);

      //     this.router.navigateByUrl(`home`);
      //    }
      //    if(data.type=='message'){
      //     console.log(type);
      //     const sent_user_id = messageobj.id;

      //     this.router.navigateByUrl(`message/${sent_user_id}`);
      //    }


      //     console.log("Received in background");
      //   } else {


      //     this.localNotifications.schedule({
      //       id: 1,
      //       title: ""+data.title+"",
      //       text: ""+data.body+""

      //     });
      //     console.log("Received in foreground");
      //   };
      // });

      // this.localNotifications.on('click').subscribe(notification => {
      //   console.log(notification);
      //       this.navCtrl.navigateForward('/home'); 

      //    });

      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
        this.gcm_id = token;
      });


    });
  }

  loginGoogle() {
    // this.showLoading();
    this.googleplus.login({
      'webClientId':'718913962722-k8tgkn1f5hif3brasrpe1l0g94plqqsu.apps.googleusercontent.com', 
      'offline': false
    })
    .then(res =>{
      console.log("oninit",res)
      this.Userdatagoogle=res;
      console.log(this.Userdatagoogle);
      this.loginSucess()
     })
     .catch(err => console.error("oninit",err));
     }

     loginSucess(){
      console.log("hiii");
      
      const data={
        "familyname":  this.Userdatagoogle.familyName,
        "givenname": this.Userdatagoogle.givenName,
        "gcm_id": this.gcm_id,
        "email":  this.Userdatagoogle.email,
        "userId": this.Userdatagoogle.userId,
       
      }
      console.log(data);
      this.authservice.googleLogin(data).subscribe((data) => {
      // this.hideLoading();
      console.log(data);
      this.onLoginForm.reset();
      
      this.userLogindata=data;
      this.userLogin = this.userLogindata.user_details;
      console.log(this.userLogin);

        if (this.userLogindata.success) {
          this.onLoginForm.reset();
        localStorage.setItem('id', this.userLogin.id);
        localStorage.setItem('token', this.userLogin.token);
        localStorage.setItem('pincode', this.userLogin.pincode);

        if(this.userLogin.pincode == "" || this.userLogin.pincode == null){
           this.navCtrl.navigateRoot('/edit-profile');
        }else{
           this.navCtrl.navigateRoot('/home');
        }
      }
      else {
        this.presentalert(this.userLogindata.error);
        this.onLoginForm.reset();
        // console.log(this.error)
      }
      
    });
    }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      //navigator['app'].exitApp();
      this.navCtrl.pop();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    // document.querySelector('video').play();

    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])],
      // 'accept': [null, Validators.compose([
      //   Validators.required
      // ])]
    });
  }

  async forgotPass() {

    this.navCtrl.navigateForward('forgot-password')
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
  onSubmit() {
    this.showLoading();
    if (!this.onLoginForm.value.email) {
      this.onLoginForm.controls['email'].markAsTouched()
      this.submit = true;
    }
    if (!this.onLoginForm.value.password) {
      this.onLoginForm.controls['password'].markAsTouched()
      this.submit = true;

    }
    // if(!this.onLoginForm.value.accept){
    //   this.onLoginForm.controls['accept'].markAsTouched()
    //   this.submit = true;

    // }

    else {
      console.log(this.onLoginForm.value)


      const user = {
        email: this.onLoginForm.value.email,
        password: this.onLoginForm.value.password,
        gcm_id: this.gcm_id
      }
      console.log(this.gcm_id)
      this.authservice.login(user).subscribe((data) => {
        this.user_data = data;
        this.hideLoading();
        this.onLoginForm.reset();
        console.log('atgfsg')

        console.log(this.user_data)
        // this.error=this.data1.console.error;
        // console.log(this.error);


        if (this.user_data.success) {

          localStorage.setItem("token", this.user_data.user_details.token);
          localStorage.setItem("id", this.user_data.user_details.id);
          localStorage.setItem("pincode", this.user_data.user_details.pincode);
          // this.presentToast(this.user_data.success)
          this.navCtrl.navigateRoot('/home');
        }

        else {
          this.presentalert(this.user_data.error);
          // console.log(this.error)
        }

      })
    }

  }

  async presentalert(error) {
    let alert = await this.alertCtrl.create({
      header: 'Caution',
      message: error,
      buttons: [

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


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }



  // // //
  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  goToHome() {
    this.navCtrl.navigateRoot('/home');
  }

}
