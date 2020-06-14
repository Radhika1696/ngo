import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";
import { Capability } from "protractor";
import { map, retry } from "rxjs/operators";
import { PathLocationStrategy } from '@angular/common';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: "root"
})
export class AuthService {
    userList
     api_url
    constructor(public http: HttpClient) {
        console.log("Hello AuthService Provider");
   // this.api_url='https://cors-anywhere.herokuapp.com/http://innolytic.tk/ngo/Webs'
    this.api_url='https://innolytic.tk/ngo/Webs'
}

// postApi(endPoint: string,req): Observable<any> {
//     console.log(req);
    
//     return this.http.post(this.api_url + endPoint,JSON.stringify(req))
//     .pipe(
//       retry(1),
//     //  catchError("hiiiii")
//     )
//   }

googleLogin(user) {
    if(user.gcm_id == '' || user.gcm_id== null )
        user.gcm_id = '0';
    const customer = {
        familyname:user.familyname,
        givenname:user.givenname,
        gcm_id:user.gcm_id,
        email: user.email,
        userId: user.userId,
    };

    return this.http.post(this.api_url+
        "/google_login",
        customer
    );
}
    
  user_count(user){
    return this.http.post(this.api_url+"/show_user_count",user)
  }

    signUp(customer,type) {
        if(customer.gcm_id == '' || customer.gcm_id== null )
        customer.gcm_id = '0';
        console.log("alal", customer);
        const user = {
      
            name: customer.name,
            email: customer.email,
            password: customer.password,
            pincode: customer.pincode,
            contact_no: customer.contact_no,
            aadhar_pan_no: customer.aadhar_pan_no,
            photo:customer.photo,
             gcm_id:customer.gcm_id,
             type:type
            
        };
        console.log('this is user data'+user);
        return this.http.post(this.api_url+
            "/user_register",
            user
        );
    }

    edit_profile(customer,status,type) {
        console.log("alal", customer);
        const user_id=localStorage.getItem('id');
        const token=localStorage.getItem('token');
        const user = {
            user_id:user_id,
            token:token,
            name: customer.name,
            pincode: customer.pincode,
            aadhar_pan_no: customer.aadhar_pan_no,  
            photo:customer.photo,
            status:status,
            type:type
        };
        console.log('this is user data'+user);
        return this.http.post(this.api_url+
            "/edit_profile",
            user
        );
    }

    user_profile(){
        const user_id=localStorage.getItem('id');
        const token=localStorage.getItem('token');
        const user={
            user_id:user_id,
            token:token,
           
        }
        return this.http.post(this.api_url+"/user_profile",user)
    }
    


    username(user_name) {
        const user = {
            username: user_name
        };
        return this.http.post(
            "",
            user
        );
    }


    login(user) {
        if(user.gcm_id == '' || user.gcm_id== null )
            user.gcm_id = '0';
        const customer = {
            email: user.email,
            password: user.password,
             gcm_id:user.gcm_id
        };

        return this.http.post(this.api_url+
            "/sign_in",
            customer
        );
    }



    forgot_password(contact_no){
        // const user_id=localStorage.getItem('id');
        // const token=localStorage.getItem('token');
        const user={
            // user_id:user_id,
            // token:token,
            contact_no:contact_no
        }
        return this.http.post(this.api_url+"/forgot_password",user)

    }

    verify_otp(otp,contact_no){
        // const user_id=localStorage.getItem('id');
        // const token=localStorage.getItem('token');
        const user={
            // user_id:user_id,
            // token:token,
            otp:otp,
            contact_no:contact_no
        }
        return this.http.post(this.api_url+"/verify_otp_forgot",user)

    }

    verify_register_otp(otp,contact_no){
        const user_id=localStorage.getItem('id');
        const token=localStorage.getItem('token');
        const user={
            user_id:user_id,
            token:token,
            otp:otp,
            contact_no:contact_no
        }
        return this.http.post(this.api_url+"/verify_otp",user)

    }

    change_password(current_password,new_password,confirm_newpassword){
        const user_id=localStorage.getItem('id');
        const token=localStorage.getItem('token');
        const user={
            user_id:user_id,
            token:token,
            current_password:current_password,
            new_password:new_password,
            confirm_newpassword:confirm_newpassword
        }
        return this.http.post(this.api_url+"/change_password",user)
    }

    donor_list(pincode){
        if (pincode == '' || pincode == null){
            pincode='0'
        }
        
        let user_id=localStorage.getItem('id');
        const token=localStorage.getItem('token');
        if (user_id == '' || user_id == null){
            user_id='0'
        }
        const user={
            user_id:user_id,
            token:token,
           pincode:pincode
        }
          return this.http.post(this.api_url+"/donor_list",user)

        // .pipe(
        //     map(
        //         (data: any) => {
        //                if( data.pincode == '' || data.pincode == null){
        //                    pincode='0'
        //                }
                     
        //         }
        // ));
    //    return userList
        
    }

    receiver_list(pincode){
        if (pincode == '' || pincode == null){
            pincode='0'
        }
        let user_id=localStorage.getItem('id');
        const token=localStorage.getItem('token');
        if (user_id == '' || user_id == null){
            user_id='0'
        }
        const user={
            user_id:user_id,
            token:token,
            pincode:pincode
           
        }
        return this.http.post(this.api_url+"/receiver_list",user)
    }

    send_message(sent_user_id,msg){
        const user_id=localStorage.getItem('id');
        const token=localStorage.getItem('token');
        const user={
            user_id:user_id,
            token:token,
            sent_user_id:sent_user_id,
            msg:msg
        }
        return this.http.post(this.api_url+"/send_message",user)
    }

    report_abuse(request_id,){
        const user_id=localStorage.getItem('id');
        const token=localStorage.getItem('token');
        const user={
            user_id:user_id,
            token:token,
            request_id:request_id
            
        }
        return this.http.post(this.api_url+"/report_abuse",user)
    }

    mark_donated(request_id,){
        const user_id=localStorage.getItem('id');
        const token=localStorage.getItem('token');
        const user={
            user_id:user_id,
            token:token,
            request_id:request_id
            
        }
        return this.http.post(this.api_url+"/donate",user)
    }

    // mark_receiver(request_id,){
    //     const user_id=localStorage.getItem('id');
    //     const token=localStorage.getItem('token');
    //     const user={
    //         user_id:user_id,
    //         token:token,
    //         request_id:request_id
            
    //     }
    //     return this.http.post(this.api_url+"/send_feedback_receiver_list",user)
    // }

    feedback_donor_notification(request_id,){
        const user_id=localStorage.getItem('id');
        const token=localStorage.getItem('token');
        const user={
            user_id:user_id,
            token:token,
            request_id:request_id
            
        }
        return this.http.post(this.api_url+"/send_feedback_donor_notification",user)
    }



    message_list(sent_user_id){
        const user_id=localStorage.getItem('id');
        const token=localStorage.getItem('token');
        const user={
            user_id:user_id,
            token:token,
            sent_user_id:sent_user_id
            
           
        }
        return this.http.post(this.api_url+"/message_list",user)
    }

    view_profile(){
        const user_id=localStorage.getItem('id');
        const token=localStorage.getItem('token');
        const user={
            user_id:user_id,
            token:token  ,
            // sent_user_id:sent_user_id
        }
        return this.http.post(this.api_url+"/view_profile",user)
    }

    request_view_profile(sent_user_id){
        const user_id=localStorage.getItem('id');
        const token=localStorage.getItem('token');
        const user={
            user_id:user_id,
            token:token  ,
            sent_user_id:sent_user_id
        }
        return this.http.post(this.api_url+"/request_view_profile",user)
    }
  

  create_request(user_type,msg){
    const user_id=localStorage.getItem('id');
    const token=localStorage.getItem('token');
    const user={
        user_id:user_id,
        token:token,
        user_type:user_type,
        msg:msg
       
    }
    return this.http.post(this.api_url+"/send_request",user)
  }

  feedback_donor(request_id,rating_no,msg,images){
    const user_id=localStorage.getItem('id');
    const token=localStorage.getItem('token');
    const user={
        user_id:user_id,
        token:token,
        request_id:request_id,
        rating_no:rating_no,
        msg:msg,
        images : images
    }
    return this.http.post(this.api_url+"/send_feedback_donor",user)
  }



  feedback_receiver(request_id,rating_no,msg,images){
    const user_id=localStorage.getItem('id');
    const token=localStorage.getItem('token');
    const user={
        user_id:user_id,
        token:token,
        request_id:request_id,
        rating_no:rating_no,
        msg:msg  ,
        images : images 
    }
    return this.http.post(this.api_url+"/send_feedback_receiver",user)
  }

  feedback_receiverlist(request_id,rating_no,msg, images){
    const user_id=localStorage.getItem('id');
    const token=localStorage.getItem('token');
    const user={
        user_id:user_id,
        token:token,
        request_id:request_id,
        rating_no:rating_no,
        msg:msg,
        images : images
    }
    return this.http.post(this.api_url+"/send_feedback_receiver_list",user)
  }

  send_feedback_donor_notification(request_id,rating_no,msg,images){
    const user_id=localStorage.getItem('id');
    const token=localStorage.getItem('token');
    const user={
        user_id:user_id,
        token:token,
        request_id:request_id,
        rating_no:rating_no,
        msg:msg ,
        images : images
    }
    return this.http.post(this.api_url+"/send_feedback_donor_notification",user)
  }


  account_donationList(){
    const user_id=localStorage.getItem('id');
    const token=localStorage.getItem('token');
    const user={
        user_id:user_id,
        token:token,
         
    }
    return this.http.post(this.api_url+"/account_donor_list",user)
  }

  
  account_receiverList(){
    const user_id=localStorage.getItem('id');
    const token=localStorage.getItem('token');
    const user={
        user_id:user_id,
        token:token,
         
    }
    return this.http.post(this.api_url+"/account_receiver_list",user)
  }

  view_request(request_id){
    const user_id=localStorage.getItem('id');
    const token=localStorage.getItem('token');
    const user={
        user_id:user_id,
        token:token,
        request_id:request_id,
     
    }
    return this.http.post(this.api_url+"/view_request",user)
  }

  edit_request(request_id,msg){
    const user_id=localStorage.getItem('id');
    const token=localStorage.getItem('token');
    const user={
        user_id:user_id,
        token:token,
        request_id:request_id,
        msg:msg
     
    }
    return this.http.post(this.api_url+"/edit_request",user)
  }

  
  register_resend_otp(){
    const user_id=localStorage.getItem('id');
    const token=localStorage.getItem('token');
    const user={
        user_id:user_id,
        token:token,
    }
    return this.http.post(this.api_url+"/resend_otp",user)
  }

  forgot_resend_otp(){
    const user_id=localStorage.getItem('id');
    const token=localStorage.getItem('token');
    const user={
        user_id:user_id,
        token:token,
    }
    return this.http.post(this.api_url+"/forgot_resend_otp",user)
  }
}
