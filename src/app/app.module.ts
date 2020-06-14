import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AgmCoreModule } from '@agm/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

//file upload

import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
// import { Camera } from '@ionic-native/camera/ngx';
// import { File } from '@ionic-native/file/ngx';



import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { TranslateProvider, HotelProvider } from './providers';
// Modal Pages
import { ImagePageModule } from './pages/modal/image/image.module';
import { LocationPageModule } from './pages/modal/location/location.module';
import { UserCountPageModule } from './pages/user-count/user-count.module'
import { PopupPageModule } from './pages/popup/popup.module'
import { ReportAbusePageModule } from './pages/report-abuse/report-abuse.module'

//download Images
import {FileTransfer} from '@ionic-native/file-transfer/ngx'

//notification
import { FCM } from '@ionic-native/fcm/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { OtpPageModule } from './pages/otp/otp.module';
import { PopupReceiverPageModule } from './pages/popup-receiver/popup-receiver.module';
import { RegisterOtpPageModule } from './pages/register-otp/register-otp.module';
import { ReportAbuseDonorPageModule } from './pages/report-abuse-donor/report-abuse-donor.module';
import { TermsConditionsPageModule } from './pages/terms-conditions/terms-conditions.module';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(environment.config),
    AppRoutingModule,
    HttpClientModule,
    ImagePageModule,
    LocationPageModule,
    UserCountPageModule,
    PopupPageModule,
    TermsConditionsPageModule,
    PopupReceiverPageModule,
    OtpPageModule,
    RegisterOtpPageModule,
    ReportAbusePageModule,
    ReportAbuseDonorPageModule,
    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9BxeSvt3u--Oj-_GD-qG2nPr1uODrR0Y'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer,
    File,
    FCM,
    LocalNotifications,
    AndroidPermissions,
    GooglePlus,
    Camera,
    PhotoViewer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TranslateProvider,
    HotelProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
