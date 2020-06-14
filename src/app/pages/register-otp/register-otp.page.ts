import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, ToastController, AlertController, ModalController, PopoverController, NavParams } from '@ionic/angular';
import { TranslateProvider } from '../../providers';
import { AuthService } from '../../auth.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-otp',
  templateUrl: './register-otp.page.html',
  styleUrls: ['./register-otp.page.scss'],
})
export class RegisterOtpPage implements OnInit {
  public OtpForm: FormGroup;
  submit;
  current_password;
  password
  new_password;
  confirm_newpassword
  otp
  otp1
  err;
  contact_no
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private popCtrl: PopoverController,
    public toastCtrl: ToastController,
    private translate: TranslateProvider,
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    public route: ActivatedRoute,
    private params: NavParams,
    private router: Router) {
    //  this.email = this.route.snapshot.paramMap.get('email');
    //   console.log(this.email);

  }

  ngOnInit() {
    this.contact_no = this.params.get('search')
    console.log(this.contact_no);

    this.OtpForm = this.formBuilder.group({

      'otp': [null, Validators.compose([
        Validators.required,

      ])],

    });
  }

  async changepassword() {
    console.log(this.OtpForm.value)
    if (!this.OtpForm.value.otp) {
      this.OtpForm.controls['otp'].markAsTouched()
      this.submit = true;
    }


    else {
      console.log(this.OtpForm.value)
    }


    this.otp = this.OtpForm.get('otp').value,


      this.authservice.verify_register_otp(this.otp, this.contact_no).subscribe((data) => {
        this.otp1 = data;
        console.log(this.otp1)


        // this.error = this.password.error_msg;
        if (this.otp1.success) {

          let msg = "Email and otp matchfdvf successfully"
          let err = "Invalid otp"
          this.presentToast(this.otp1.success);
          this.OtpForm.reset();
          // this.navCtrl.navigateForward('login')
          this.router.navigateByUrl('login')
          this.closeModal();

        }

        else {
          this.presentalert(this.otp1.error);
        }

      })

  }

  resendOtp(){
    this.authservice.register_resend_otp().subscribe((data) => {
      this.otp1 = data;
      console.log(this.otp1)
      this.OtpForm.reset();

      // this.error = this.password.error_msg;
      if (this.otp1.success) {

        let msg = "Email and otp matchfdvf successfully"
        let err = "Invalid otp"
        this.presentToast(this.otp1.success);
        this.OtpForm.reset();
        // this.navCtrl.navigateForward('login')
        // this.router.navigateByUrl('register-otp')
        // this.closeModal();

      }

      else {
        this.presentalert(this.otp1.error);
      }

    })


  }

  async presentalert(err) {
    let alert = await this.alertCtrl.create({
      header: 'Caution',
      message: err,
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



  closeModal() {
    this.popCtrl.dismiss();
  }
}

