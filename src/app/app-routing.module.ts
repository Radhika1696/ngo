import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'show-user-count', loadChildren: () => import('./pages/show-user-count/show-user-count.module').then(m => m.ShowUserCountPageModule) },
  { path: 'user-count', loadChildren: () => import('./pages/user-count/user-count.module').then(m => m.UserCountPageModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'logout', loadChildren: () => import('./pages/logout/logout.module').then(m => m.LogoutPageModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule) },
  { path: 'donor-list', loadChildren: () => import('./pages/donor-list/donor-list.module').then(m => m.DonorListPageModule) },
  { path: 'donation-list', loadChildren: () => import('./pages/donation-list/donation-list.module').then(m => m.DonationListPageModule) },
  { path: 'received-list', loadChildren: () => import('./pages/received-list/received-list.module').then(m => m.ReceivedListPageModule) },
  { path: 'my-account', loadChildren: () => import('./pages/my-account/my-account.module').then(m => m.MyAccountPageModule) },
  { path: 'request', loadChildren: () => import('./pages/request/request.module').then(m => m.RequestPageModule) },
  { path: 'feedback', loadChildren: () => import('./pages/feedback/feedback.module').then(m => m.FeedbackPageModule) },
  { path: 'popup', loadChildren: () => import('./pages/popup/popup.module').then(m => m.PopupPageModule) },
  { path: 'popup-receiver', loadChildren: () => import('./pages/popup-receiver/popup-receiver.module').then(m => m.PopupReceiverPageModule) },
  { path: 'receiver-list', loadChildren: () => import('./pages/receiver-list/receiver-list.module').then(m => m.ReceiverListPageModule) },
  { path: 'message/:user_id', loadChildren: () => import('./pages/message/message.module').then(m => m.MessagePageModule) },
  { path: 'mark-donate/:id', loadChildren: () => import('./pages/mark-donate/mark-donate.module').then(m => m.MarkDonatePageModule) },
  { path: 'mark-receiver-feedback/:id', loadChildren: () => import('./pages/mark-receiver-feedback/mark-receiver-feedback.module').then(m => m.MarkReceiverFeedbackPageModule) },
  { path: 'marked-receiver/:id', loadChildren: () => import('./pages/marked-receiver/marked-receiver.module').then(m => m.MarkedReceiverPageModule) },
  { path: 'marked-receiver-notification/:id', loadChildren: () => import('./pages/marked-receiver-notification/marked-receiver-notification.module').then(m => m.MarkedReceiverNotificationPageModule) },
  { path: 'report-abuse/:user_id', loadChildren: () => import('./pages/report-abuse/report-abuse.module').then(m => m.ReportAbusePageModule) },
  { path: 'report-abuse-donor/:user_id', loadChildren: () => import('./pages/report-abuse-donor/report-abuse-donor.module').then(m => m.ReportAbuseDonorPageModule) },
  { path: 'view-profile/:user_id', loadChildren: () => import('./pages/view-profile/view-profile.module').then(m => m.ViewProfilePageModule) },
  { path: 'user-profile', loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfilePageModule) },
  { path: 'edit-profile', loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule) },
  { path: 'location', loadChildren: () => import('./pages/modal/location/location.module').then(m => m.LocationPageModule) },
  { path: 'changepassword', loadChildren: () => import('./pages/changepassword/changepassword.module').then(m => m.ChangepasswordPageModule) },
  { path: 'otp/:contact_no', loadChildren: () => import('./pages/otp/otp.module').then(m => m.OtpPageModule) },
  { path: 'register-otp/:contact_no', loadChildren: () => import('./pages/register-otp/register-otp.module').then(m => m.RegisterOtpPageModule) },
  { path: 'forgot-password', loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule) },
  { path: 'walkthrough/:user_id', loadChildren: () => import('./pages/walkthrough/walkthrough.module').then(m => m.WalkthroughPageModule) },

  { path: 'notification-receiver/:id', loadChildren: () => import('./pages/notification-receiver/notification-receiver.module').then(m => m.NotificationReceiverPageModule) },


  { path: 'notification-donor/:id', loadChildren: () => import('./pages/notification-donor/notification-donor.module').then(m => m.NotificationDonorPageModule) },

  { path: 'edit-request/:id', loadChildren: () => import('./pages/edit-request/edit-request.module').then(m => m.EditRequestPageModule) },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
