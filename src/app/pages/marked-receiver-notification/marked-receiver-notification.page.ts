import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { NavController, MenuController, LoadingController, ToastController, AlertController, PopoverController, ActionSheetController, } from '@ionic/angular';
import { AuthService } from '../../auth.service'
import { LoginPage } from '../login/login.page';
import { ModalController } from '@ionic/angular';
// import { UsernameValidator } from './username.validator';
import { OtpPage } from '../otp/otp.page';
import { PopupPage } from '../popup/popup.page';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-marked-receiver-notification',
  templateUrl: './marked-receiver-notification.page.html',
  styleUrls: ['./marked-receiver-notification.page.scss'],
})
export class MarkedReceiverNotificationPage implements OnInit {
  public feedbackForm: FormGroup;
  submit
  donorList
  pincode = '0'
  donor_list
  id
  msg
  request_id: any = this.route.snapshot.paramMap.get('id');
  mark_donated
  rating: any;
  feedback_response
  capturedSnapURL1 = new Array();
  capturedSnapURL = new Array();


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
    private router: Router,
    public actionSheetController: ActionSheetController,
    private camera: Camera,

  ) {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }



  ngOnInit() {
    this.rating = 3;
    console.log(this.rating)
    this.feedbackForm = this.formBuilder.group({

      'msg': [null, Validators.compose([
        Validators.required,

      ])],

    });

  }

  onChangeHandler(rating) {
    this.rating = rating;
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
   

  async add() {
    this.showLoading();
    console.log(this.rating);

    console.log(this.feedbackForm.value)
    if (!this.feedbackForm.value.msg) {
      this.feedbackForm.controls['msg'].markAsTouched()
      this.submit = true;
    }




    else {
      console.log(this.feedbackForm.value)
    }


    this.msg = this.feedbackForm.get('msg').value,


      this.authservice.send_feedback_donor_notification(this.request_id, this.rating, this.msg,this.capturedSnapURL).subscribe((data) => {
        this.feedback_response = data;
        this.hideLoading();
        this.feedbackForm.reset();
        console.log(this.feedback_response)



        if (this.feedback_response.success) {


          this.presentToast(this.feedback_response.success);
          this.feedbackForm.reset();
          this.navCtrl.navigateForward('home')


        }

        else {
          this.presentalert(this.feedback_response.error);
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
    this.router.navigate[('home')]
  }

  goToDonor() {
    this.navCtrl.navigateForward('donor-list')
    this.router.navigate(['donor-list']);
  }

  goToReceiver() {
    this.navCtrl.navigateForward('receiver-list')
    this.router.navigate[('receiver-list')]
  }

  goToRequest() {
    this.navCtrl.navigateForward('request')
    this.router.navigate[('request')]
  }

  goToAccount() {
    this.navCtrl.navigateForward('my-account')
    this.router.navigate[('my-account')]
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image1 = 'data:image/jpeg;base64,' + imageData;
      let base64Image = imageData;
      this.capturedSnapURL.push(base64Image);
      this.capturedSnapURL1.push(base64Image1);
      console.log(this.capturedSnapURL1);
      console.log(this.capturedSnapURL);
    }, (err) => {
    });
  }

  async selectImage() {
    let imagelength = this.capturedSnapURL1.length;
    if(imagelength>=2){
      this.presentalert("Only two images allowed")
    }
    else{
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
}


  deletefromarray(i) {
    this.capturedSnapURL1.splice(i, 1);
    this.capturedSnapURL.splice(i, 1);
    
  }
}