import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, ToastController, AlertController, ModalController } from '@ionic/angular';
import { TranslateProvider } from '../../providers';
import { AuthService } from '../../auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  public changePasswordForm: FormGroup;
  submit;
  current_password;
  new_password;
  confirm_newpassword;
  password
  err;
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private translate: TranslateProvider,
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private alertCtrl: AlertController,
    private modalController: ModalController,
    private router: Router) { }

  ngOnInit() {

    this.changePasswordForm = this.formBuilder.group({

      'current_password': [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9$@$!%*?&]*$'),
        // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{4,}'),
        // Validators.minLength(2), Validators.maxLength(12)
      ])],

      // 'new_password': [null, Validators.compose([
      //   Validators.required,
      //   Validators.pattern('^[a-zA-Z0-9$@$!%*?&]*$'),
      //   // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{4,}'),
      //   Validators.minLength(4), Validators.maxLength(12)
      // ])],

      // 'confirm_newpassword': [null, Validators.compose([
      //   Validators.required,
      //   Validators.pattern('^[a-zA-Z0-9$@$!%*?&]*$'),
      //   // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{4,}'),
      //   Validators.minLength(4), Validators.maxLength(12)
      // ])], 


      'new_password': [null, Validators.compose([
        Validators.required, Validators.minLength(4), Validators.maxLength(12)
      ])],
      'confirm_newpassword': [null, Validators.required] // Field is required
    }, { validator: this.matchingPasswords('new_password', 'confirm_newpassword') });



    // });
  }

  matchingPasswords(new_password, confirm_newpassword) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[new_password].value === group.controls[confirm_newpassword].value) {
        return null; // Return as a match
      } else {
        return { 'matchingPasswords': true } // Return as error: do not match
      }
    }
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

  async changepassword() {
    this.showLoading();
    console.log(this.changePasswordForm.value)
    if (!this.changePasswordForm.value.current_password) {
      this.changePasswordForm.controls['current_password'].markAsTouched()
      this.submit = true;
    }

    if (!this.changePasswordForm.value.new_password) {
      this.changePasswordForm.controls['new_password'].markAsTouched()
      this.submit = true;
    }

    if (!this.changePasswordForm.value.confirm_newpassword) {
      this.changePasswordForm.controls['confirm_newpassword'].markAsTouched()
      this.submit = true;
    }


    else {
      console.log(this.changePasswordForm.value)
    }


    this.current_password = this.changePasswordForm.get('current_password').value,
      this.new_password = this.changePasswordForm.get('new_password').value,
      this.confirm_newpassword = this.changePasswordForm.get('confirm_newpassword').value,

      this.authservice.change_password(this.current_password, this.new_password, this.confirm_newpassword).subscribe((data) => {
        this.changePasswordForm.reset();
        this.password = data;
        this.hideLoading();
        console.log(this.password)



        if (this.password.success
        ) {

          let msg = "Password Changed successfully"
          let err = "Invalid Password "
          this.presentToast(msg);
          this.changePasswordForm.reset();

        }

        else {
          this.presentalert(this.err);
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

