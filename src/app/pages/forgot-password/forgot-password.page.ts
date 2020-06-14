import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, ToastController, AlertController, ModalController, PopoverController } from '@ionic/angular';
import { TranslateProvider } from '../../providers';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { OtpPage } from '../otp/otp.page';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  public forgotPasswordForm: FormGroup;
  submit: boolean;
  email
  email1
  contactno
  contact_no
  error: any;
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private translate: TranslateProvider,
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private alertCtrl: AlertController,
    private popCtrl: PopoverController,
    private router: Router) { }

  ngOnInit() {

    this.forgotPasswordForm = this.formBuilder.group({

      'contact_no': [null, Validators.compose([
        Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10),
        Validators.maxLength(10),
      ])],

    });
  }


  async showLoading(){
 let loading = await this.loadingCtrl.create({
     message: "Loading...",
     spinner: "bubbles"
 });
 loading.present();
}

hideLoading(){
this.loadingCtrl.dismiss();
}
  
  async resetpassword() {
    this.showLoading();
    console.log(this.forgotPasswordForm.value)
    if (!this.forgotPasswordForm.value.contact_no) {
      this.forgotPasswordForm.controls['contact_no'].markAsTouched()
      this.submit = true;
    }


    else {
      console.log(this.forgotPasswordForm.value)
    }


    this.contact_no = this.forgotPasswordForm.get('contact_no').value,

      this.authservice.forgot_password(this.contact_no).subscribe((data) => {
        this.contactno = data;
        this.forgotPasswordForm.reset();
        this.hideLoading();
        console.log(this.contactno)
        console.log(this.forgotPasswordForm.value);

        // this.forgotPasswordForm.value

        if (this.contactno.success) {

          // let msg = "Email was sended  successfully"

          this.presentToast(this.contactno.success);
          localStorage.setItem('id', this.contactno.user_id);
          localStorage.setItem('token', this.contactno.token);
          this.forgotPasswordForm.reset();
          // this.router.navigate(['otp']);
          console.log(this.contact_no);
          this.choose();

          // this.navCtrl.navigateForward(`otp/${this.email}`);
        }

        else {
          let error = "Invalid mail"
          this.presentalert(this.contactno.error);
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


  async choose() {
    const popup = await this.popCtrl.create({
      component: OtpPage,
      componentProps: { search: this.contact_no },
      backdropDismiss: false

    });
    console.log('hy')
    return await popup.present();
  }


}


