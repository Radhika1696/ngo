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
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  donorList
  pincode = '0'
  donor_list
  id
  msg
  messageList
  messagelist
  sent_user_id: any = this.route.snapshot.paramMap.get('user_id');


  public messageForm: FormGroup;
  submit
  message
  name
  user_id
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
    public route: ActivatedRoute,

  ) {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    //this.Message();
  }

  ngOnInit() {
    this.user_id = localStorage.getItem('id');

    this.messageForm = this.formBuilder.group({
      'msg': [null, Validators.compose([
        Validators.required,
        // Validators.pattern("^[^\s]+(\s.*)$"),
        // Validators.maxLength(40),

      ])],
    });
    console.log(this.sent_user_id);

    this.getMessagelist();

  }

  getMessagelist() {
    this.authservice.message_list(this.sent_user_id).subscribe((data) => {
      this.messagelist = data

      this.messageList = this.messagelist.message_list
      console.log(this.messageList);
    })

  }

  Message() {
    console.log(this.messageForm.value)
    if (!this.messageForm.value.name) {
      this.messageForm.controls['msg'].markAsTouched()
      this.submit = true;
    }

    this.msg = this.messageForm.get('msg').value,

      this.authservice.send_message(this.sent_user_id, this.msg).subscribe((data) => {
        this.message = data;
        console.log(this.message)
        this.getMessagelist();
      })
    this.messageForm.reset();
  }

  refresh() {
    this.getMessagelist();
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



}