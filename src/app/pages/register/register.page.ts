import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { NavController, MenuController, LoadingController, ToastController, AlertController, ActionSheetController, Platform, PopoverController, } from '@ionic/angular';
import { AuthService } from '../../auth.service'
import { LoginPage } from '../login/login.page';
import { ModalController } from '@ionic/angular';
import { UsernameValidator } from './username.validator';
import { OtpPage } from '../otp/otp.page';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { RegisterOtpPage } from '../register-otp/register-otp.page';
import { TermsConditionsPage } from '../terms-conditions/terms-conditions.page';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  data5(data5: any) {
    throw new Error("Method not implemented.");
  }
  public onRegisterForm: FormGroup;
  user_data
  submit;
  data1;
  subscription
  data2: any;
  data3: any;
  data4;
  data6
  phone
  fullname
  username
  block_list
  block_id
  flat_list
  flat_no
  block_name
  societyid
  society_name
  blockid
  error
  test
  base64Image
  capturedSnapURL
  alert
  username1
  altCtrl
  society_id: any;
  modal
  options
  edited_data
  gcm_id: any
  contact_no
  capturedSnapURL1

    type: 'donor'
 
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    public platform: Platform,
    private camera: Camera,
    private fcm: FCM,
    private file: File,
    private popCtrl: PopoverController



  ) {


    platform.ready().then(() => {
      this.fcm.getToken().then(token => {
        console.log(token);
        this.gcm_id = token;
      });
    })

    this.capturedSnapURL = '';

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.capturedSnapURL1="assets/img/avatar.png"
    this.onRegisterForm = this.formBuilder.group({
      'name': [null, Validators.compose([
        Validators.required,
        // Validators.pattern("^[^\s]+(\s.*)$"),
        // Validators.maxLength(40),

      ])],
      'email': [null, Validators.compose([
        Validators.required, Validators.email, Validators.pattern("\s*^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$\s*")
      ])],

      'password': [null, Validators.compose([
        Validators.required, Validators.minLength(4), Validators.maxLength(12)
      ])],
      'pincode': [null, Validators.compose([
        Validators.required,
        // Validators.pattern('[0-9]{5}'),
        Validators.minLength(6),
        Validators.maxLength(6),

      ])],
      'contact_no': [null, Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
        Validators.maxLength(10),
      ])],
      // 'aadhar_pan_no': [null, Validators.compose([
      //   Validators.required,
      //   // Validators.pattern("^\d{4}\s\d{4}\s\d{4}$"),//adhar validation
      //   // Validators.pattern("/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]$/"),//PAN CARD  validation
      // ])],


      'accept': [null, Validators.compose([
        Validators.requiredTrue
      ])]

    });


  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: TermsConditionsPage,
      //componentProps: { search: this.contact_no },
      //backdropDismiss: false
    });
    console.log('hy')
    return await modal.present();
  }

  onChangeHandler($event) {
    this.type = $event.target.value;
  }

  //Loading
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

  async addUser() {
    this.showLoading();
    console.log(this.onRegisterForm.value)
    if (!this.onRegisterForm.value.name) {
      this.onRegisterForm.controls['name'].markAsTouched()
      this.submit = true;
    }

    if (!this.onRegisterForm.value.email) {
      this.onRegisterForm.controls['email'].markAsTouched()
      this.submit = true;
    }

    if (!this.onRegisterForm.value.password) {
      this.onRegisterForm.controls['password'].markAsTouched()
      this.submit = true;

    }
    if (!this.onRegisterForm.value.pincode) {
      this.onRegisterForm.controls['pincode'].markAsTouched()
      this.submit = true;
    }

    if (!this.onRegisterForm.value.contact_no) {
      this.onRegisterForm.controls['contact_no'].markAsTouched()
      this.submit = true;
    }

    // if (!this.onRegisterForm.value.aadhar_pan_no) {
    //   this.onRegisterForm.controls['aadhar_pan_no'].markAsTouched()
    //   this.submit = true;
    // }



    if (!this.onRegisterForm.value.accept) {
      this.onRegisterForm.controls['accept'].markAsTouched()
      this.submit = true;

    }
    else {
      console.log(this.onRegisterForm.value)
    }

    const user = {
      name: this.onRegisterForm.get('name').value,
      email: this.onRegisterForm.get('email').value,
      password: this.onRegisterForm.get('password').value,
      pincode: this.onRegisterForm.get('pincode').value,
      contact_no: this.onRegisterForm.get('contact_no').value,
      // aadhar_pan_no: this.onRegisterForm.get('aadhar_pan_no').value,
      photo: this.capturedSnapURL,
      gcm_id: this.gcm_id
      // username: this.onRegisterForm.get('username').value

    }

console.log(this.contact_no)
    this.authservice.signUp(user,this.type).subscribe((data) => {
      this.data1 = data;
      this.hideLoading();
      this.onRegisterForm.reset();
      console.log(this.data1)
      localStorage.setItem("token", this.data1.token);
      localStorage.setItem("id", this.data1.user_id);


      this.error = this.data1.error;
      if (this.data1.success) {

        let msg = "Registered successfully"
        this.presentToast(this.data1.success);
        this.onRegisterForm.reset();
        this.choose();

        // this.navCtrl.navigateRoot('register-otp');
      }

      else {
        this.presentalert(this.data1.error);
      }
    })
  }

  
  

  async choose() {
    const popup = await this.popCtrl.create({
      component: RegisterOtpPage,
      componentProps: { search: this.contact_no },
      backdropDismiss: false
    });
    console.log('hy')
    return await popup.present();
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



  matchingPasswords(password, confirm_password) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value === group.controls[confirm_password].value) {
        return null; // Return as a match
      } else {
        return { 'matchingPasswords': true } // Return as error: do not match
      }
    }
  }

  goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }


  ashish(data) {
    alert("hello")
    console.log(data)
  }

  //only alphabets are allowed
  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
      return true
    }
    else {
      return false
    }
  }

  //leading and trailing spaces validation
  noWhitespaceValidator(onRegisterForm: FormControl) {
    const isWhitespace = (onRegisterForm && onRegisterForm.value && onRegisterForm.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }




  //Image upload

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image1 = 'data:image/jpeg;base64,' + imageData;
      let base64Image = imageData;
      this.capturedSnapURL = base64Image;
      this.capturedSnapURL1 = base64Image1;
    }, (err) => {
      // Handle error
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  //takephoto

  // takePhoto() {
  //   this.platform.ready().then(() => {
  //       if(this.platform.is('cordova')){
  //           this.camera.getPicture(this.options).then((imageData) => {
  //               // imageData is either a base64 encoded string or a file URI
  //               // If it's base64 (DATA_URL):
  //               let base64Image = 'data:image/jpeg;base64,' + imageData;
  //           }, (err) => {
  //               // Handle error
  //           });
  //       }
  //   })
  // }



  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      console.log('back button clicked');
      //navigator['app'].exitApp();
      this.navCtrl.pop();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
}



