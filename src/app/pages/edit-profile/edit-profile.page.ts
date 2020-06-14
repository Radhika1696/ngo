import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ActionSheetController,
  ToastController,
  ModalController,
  AlertController,
  LoadingController
} from "@ionic/angular";
import { TranslateProvider, HotelProvider } from "../../providers";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

import { environment } from "../../../environments/environment";

import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from "@angular/animations";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../auth.service";
import { Router } from '@angular/router';


@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.page.html",
  styleUrls: ["./edit-profile.page.scss"],
})

export class EditProfilePage implements OnInit {
  hotelLists: String = "cardlist";
  agmStyles: any[] = environment.agmStyles;
  hotels: any;
  addfamily;
  editProfileForm: FormGroup;
  FamilyList: any;
  user_status
  id
  data
  userData
  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  data5(data5: any) {
    throw new Error("Method not implemented.");
  }
  // public : any = {
  //   type: 'donor'
  // };
  type
  user_data
  submit;
  data1;
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
  capturedSnapURL1
  alert
  username1
  altCtrl
  society_id: any;
  modal
  user_type
  options
  edited_data
  userphoto
  status
  index
test1
  constructor(
    public navCtrl: NavController,
    private translate: TranslateProvider,
    public hotelService: HotelProvider,
    private formbuilder: FormBuilder,
    private authservice: AuthService,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router,
    private loadingCtrl:LoadingController
  ) {
    this.capturedSnapURL = '';
    this.editProfileForm = this.formbuilder.group({

      'name': [null, Validators.compose([
        Validators.required,
      ])],

      'pincode': [null, Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ])],

      // 'aadhar_pan_no': [null, Validators.compose([
      //   Validators.required,

      // ])],

    });
    console.log("1");
  }

  ngOnInit() {
    this.capturedSnapURL1="assets/img/avatar.png"
    console.log("2");

    this.authservice.user_profile().subscribe((data) => {

      this.data = data
      this.user_data = this.data.user_details
      this.user_type = this.user_data.type,
      this.capturedSnapURL1= this.user_data.photo;
      console.log(this.user_data);
      this.user_status = this.user_data.status;
      if (this.user_data) {
        this.editProfileForm.patchValue({
          name: this.user_data.name,
          pincode: this.user_data.pincode,
          // aadhar_pan_no: this.user_data.aadhar_pan_no,
          // photo: this.user_data.photo,
          status: this.user_data.status,
          type:this.user_data.type

        });
      }
    });

  }

  //radio button
  onChangeHandler($event) {
    this.status = $event.target.value;
    console.log(this.status);

  }

  onChangeHandler1($event) {
    this.test1 = $event.target.value;
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

  edit() {
    this.showLoading();
    const user = {
      name: this.editProfileForm.get('name').value,
      pincode: this.editProfileForm.get('pincode').value,

      // aadhar_pan_no: this.editProfileForm.get('aadhar_pan_no').value,
      // status:this.editProfileForm.get('status').value,
      photo: this.capturedSnapURL,

    }
    // localStorage.setItem('pincode', this.editProfileForm.get('pincode').value);
    // console.log(localStorage.getItem('pincode'));

    this.authservice
      .edit_profile(user, this.status,this.test1)
      .subscribe(data => {
        this.userData = data;
        this.hideLoading();
        console.log(this.userData);


        if (this.userData.success
        ) {
          localStorage.setItem('pincode', this.editProfileForm.get('pincode').value);
          console.log(localStorage.getItem('pincode'));
          this.presentToast(this.userData.success);
          this.editProfileForm.reset();
          this.navCtrl.navigateForward('home')
        }

        else {
          this.presentalert(this.userData.error);
        }

      });
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
      this.capturedSnapURL1 = base64Image1;
      let base64Image = imageData;
      this.capturedSnapURL = base64Image;
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
