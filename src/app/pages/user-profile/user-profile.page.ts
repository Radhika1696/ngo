import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { NavController, MenuController, LoadingController, ToastController, AlertController, PopoverController, } from '@ionic/angular';
import { AuthService } from '../../auth.service'
import { LoginPage } from '../login/login.page';
import { ModalController } from '@ionic/angular';
// import { UsernameValidator } from './username.validator';
import { OtpPage } from '../otp/otp.page';
import { PopupPage } from '../popup/popup.page';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  sent_user_id: any = this.route.snapshot.paramMap.get('user_id');
  donorList
  pincode = '0'
  donor_list
  id
  msg
  profile_data
  profile_details
  reviews_details
  img1
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
    private router: Router

  ) {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    console.log(this.sent_user_id)
    this.get_view_profile();



  }

  get_view_profile() {
    this.authservice.view_profile().subscribe((data) => {
      this.profile_data = data
      this.profile_details = this.profile_data.user_details


      console.log(this.profile_details);
      this.reviews_details = this.profile_data.reviews_rating
      console.log(this.reviews_details);

    })
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