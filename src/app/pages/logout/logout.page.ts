import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Events,NavController, MenuController, ToastController, AlertController, LoadingController, Platform } from '@ionic/angular';
import { TranslateProvider } from '../../providers';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {
  public onlogoutForm: FormGroup;
  username
  parent_id
  id
  tokennew
  err
  password
  full_name
  data1
  submit;
  email;
  subscription: any;
  backButtonSubscription;
  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private translate: TranslateProvider,
    private formBuilder: FormBuilder,
    private authservice:AuthService,
    private altCtrl:AlertController,
    public events: Events
  ) { }


  ngOnInit() {
    // document.querySelector('video').play();
    localStorage.clear();
    this.navCtrl.navigateRoot('login');
   
  }


}
