import { Component } from '@angular/core';

import { Platform, NavController,  Events, MenuController  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateProvider } from './providers/translate/translate.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

import { Pages } from './interfaces/pages';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { ShowUserCountPage } from './pages/show-user-count/show-user-count.page';
import { UserCountPage } from './pages/user-count/user-count.page';
import { Router } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

/**
 * Main Wrap App Component with starting methods
 *
 * @export
 * @class AppComponent
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  id
  rootPage
  sent_user_id
  language
  full_name
  type
  subscription: any;
  backButtonSubscription;
  /**
   * Creates an Array instance with <Pages> interface that receives all menu list.
   *
   * @type {Array<Pages>}
   * @memberof AppComponent
   */
  public appPages: Array<Pages>;
  currentUser: any;
  SignupPage: any;
 
  /**
   * Creates an instance of AppComponent.
   * @param {Platform} platform
   * @param {SplashScreen} splashScreen
   * @param {StatusBar} statusBar
   * @param {TranslateProvider} translate
   * @param {TranslateService} translateService
   * @param {NavController} navCtrl
   * @memberof AppComponent
   */
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateProvider,
    private translateService: TranslateService,
    public navCtrl: NavController,
    public events: Events,
    public router:Router,
    private fcm : FCM,
    private localNotifications : LocalNotifications,
    public menuCtrl: MenuController,
  ) {
  
    this.id=localStorage.getItem('id');
    this.language = localStorage.getItem('language');
    if(!this.language) 
    {
      localStorage.setItem("language", "en")
      this.language =  localStorage.getItem('language');
    }
    console.log('id',this.id);
    
    this.platform.ready().then(() => {
    this.fcm.onNotification().subscribe(data => {
      console.log('fb start');
      console.log(data);
      
      const messageobj = JSON.parse(data.message);
      this.type = messageobj.type;
     
      console.log('fb end');
      if(data.wasTapped){
        console.log('data start');
        console.log('data end');

        console.log('msg obj start');
        console.log(messageobj);
        
        console.log('msg obj end');
        
        console.log('type start');
        console.log(this.type);
        console.log('type end');
       if(this.type=='donation_receiver'){
         console.log(this.type);
        const donor_id = messageobj.id;
        console.log(data.message.id);
        console.log('donation');
        console.log('Check Before Redirect');
      
        //this.navCtrl.navigateForward(`marked-receiver/${donor_id}`); 
       // this.navCtrl.setDirection('root');
         
       this.router.navigateByUrl(`notification-donor/${donor_id}`);
        console.log('Check After Redirect');
       }

       if(this.type=='mark_receiver'){
        console.log(this.type);
        this.sent_user_id = messageobj.id;
       console.log('donation');
       console.log('Check Before Redirect');
     
       //this.navCtrl.setDirection('root');
        
       this.router.navigateByUrl(`notification-receiver/${this.sent_user_id}`);
       console.log('Check After Redirect');
      }
       if(this.type=='admin'){
        console.log(this.type);
       // this.navCtrl.navigateForward('/home'); 
      //  this.router.navigateByUrl(`home`);
       }
       if(this.type=='message'){
        console.log(this.type);
        this.sent_user_id = messageobj.sent_user_id;

       // this.navCtrl.setDirection('root');
      // this.navCtrl.navigateRoot(`/message/${this.sent_user_id}`);
       //   this.router.navigateByUrl(`message/${sent_user_id}`);
      this.router.navigateByUrl(`walkthrough/${this.sent_user_id}`);
       }
       
       
       
      
        
     //  this.navCtrl.navigateForward('/home'); 
        console.log("Received in background");
      } else {
        console.log(data);
        console.log(data.message);
        const messageobj = JSON.parse(data.message);
        console.log(messageobj);
        this.localNotifications.schedule({
          id: 1,
          title: ""+data.title+"",
          text: ""+data.body+"", 
          data :  { 
                   id: messageobj.id,
                   type : messageobj.type,
                   sent_user_id : messageobj.sent_user_id
                  }
          //sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
        });
        console.log("Received in foreground");
      };
    });

    this.localNotifications.on('click').subscribe(notification => {
      console.log('this is after click foreground notification payload');
      console.log(notification.data);
      
      if(notification.data.type=='mark_receiver'){
        console.log(notification.data.type);
        this.id = notification.data.id;
       console.log('donation');
       console.log(this.sent_user_id);
       console.log('Check Before Redirect');
     
       //this.navCtrl.setDirection('root');
        
       this.router.navigateByUrl(`notification-receiver/${this.id}`);
       console.log('Check After Redirect');
      }

      if(notification.data.type=='donation_receiver'){
        console.log(notification.data.type);
        this.id = notification.data.id;
       console.log('donation');
       console.log('Check Before Redirect');
     
       //this.navCtrl.setDirection('root');
        
       this.router.navigateByUrl(`notification-donor/${this.id}`);
       console.log('Check After Redirect');
      }

      if(notification.data.type=='message'){
        console.log(notification.data.type);
        this.sent_user_id = notification.data.sent_user_id;
       console.log('donation');
       console.log(this.sent_user_id);
       console.log('Check Before Redirect');
     
       //this.navCtrl.setDirection('root');
        
       this.router.navigateByUrl(`walkthrough/${this.sent_user_id}`);
       console.log('Check After Redirect');
      }
      
         // this.navCtrl.navigateForward('/home'); 

       });

     

  });




    // if(!this.id){
    //   this.rootPage = UserCountPage; 
    // }else{
    //   this.rootPage =  HomePage;
    // }

    // this.appPages = [
    //   {
    //     title: 'Home',
    //     url: '/home',
    //     direct: 'root',
    //     icon: 'home'
    //   },
 

    //   {
    //     title: 'User',
    //     url: '/user-count',
    //     direct: 'root',
    //     icon: 'list-box'
    //   },

    //   {
    //     title: 'Receiver List',
    //     url: '/receiver-list',
    //     direct: 'root',
    //     icon: 'list-box'
    //   },

    //   {
    //     title: 'Donor List',
    //     url: '/donor-list',
    //     direct: 'root',
    //     icon: 'list-box'
    //   },

    //   {
    //     title: 'Request',
    //     url: '/request',
    //     direct: 'forward',
    //     icon: 'lock'
    //   },

    //   {
    //     title: 'Change Password',
    //     url: '/changepassword',
    //     direct: 'forward',
    //     icon: 'lock'
    //   },
 
    //   {
    //     title: 'Logout',
    //     url: '/logout',
    //     direct: 'forward',
    //     icon: 'log-out'
    //   }
    // ];

  
 
    this.initializeApp();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
/**
 * Method that starts all Cordova and Factories
 *
 * @memberof AppComponent
 */
initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 1000);


      this.currentUser = JSON.parse(localStorage.getItem('id'));
      this.rootPage = this.currentUser
                    ? this.appPages
                    : this.SignupPage;

      // Set language of the app.
      this.translateService.setDefaultLang(this.language);
      this.translateService.use(this.language);
      this.translateService.getTranslation(this.language).subscribe(translations => {
        this.translate.setTranslations(translations);
      });
    }).catch(() => {
      // Set language of the app.
      this.translateService.setDefaultLang(this.language);
      this.translateService.use(this.language);
      this.translateService.getTranslation(this.language).subscribe(translations => {
        this.translate.setTranslations(translations);
      });
    });
  }
  /**
   * Navigate to Edit Profile Page
   *
   * @memberof AppComponent
   */
  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }
  menuOpened()
  {

    console.log('menu is opened');
  }
/**
 * Logout Method
 *
 * @memberof AppComponent
 */

logout() {
  console.log('alo me ithe');
    localStorage.clear();
    this.navCtrl.navigateRoot('login');
  }
}
