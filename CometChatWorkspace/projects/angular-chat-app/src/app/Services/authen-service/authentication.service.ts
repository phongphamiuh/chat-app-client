import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { firestore } from 'firebase';
import { LocalStorageService } from 'projects/angular-chat-app/src/cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/Out-Service/local-storage.service';
import { UserService } from 'projects/angular-chat-app/src/cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/Users/User-Service/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: Observable<firebase.User>
  constructor(private firebaseAuth: AngularFireAuth, 
              private route: Router,
              private userService: UserService,
              private localStorageService: LocalStorageService) { 
    this.userData = firebaseAuth.authState
  }

  signIn(email: string, password: string) {
    this.firebaseAuth.auth
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      if(res.user.emailVerified !== true){
        //this.registerWithSendVerificationMail();
        window.alert('Xác thực email của bạn trước khi đăng nhập')
      }else{

        this.userService.getUserById1(res.user.uid).subscribe(user => {
          console.log(user)
          this.localStorageService.set("uid",user.id_user)
          this.localStorageService.set("name",user.name)
         // this.localStorageService.set("role",user.)
          this.localStorageService.set("status",user.status)
        })
        

        this.route.navigateByUrl("/embedded-app") 
      }
    })
    .catch(err => {
      window.alert('Tên đăng nhập hoặc mật khẩu không đúng')
    })
  }

  registerWithSendVerificationMail(name, phone){
    this.firebaseAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      var friend = {
        conversationId: null,
        name: "System",
        role: "default",
        uid: "system",
        status: "online"
      }

      var user = {
        conversationId: "default",
        name: name,
        role: "default",
        uid: this.firebaseAuth.auth.currentUser.uid,
        status: "offline",
        friends: [friend]
      }

      // this.userService.save(user).subscribe(user => {

      // })

      this.userService.saveVari(this.firebaseAuth.auth.currentUser.uid,name,phone).subscribe(user => {

      })

      this.route.navigateByUrl('')
    })
  }

  sighUp(email, password, name, phone){
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(rs => {
      this.registerWithSendVerificationMail(name, phone);
    }).catch(err => {
      console.log("Error",err)
    })
  }


}
