import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CometChat } from "@cometchat-pro/chat";
import { emit } from "process";
import { COMETCHAT_CONSTANTS } from "projects/angular-chat-app/src/CONSTS";
import { AuthenticationService } from "../../Services/authen-service/authentication.service";

@Component({
  selector: "app-kitchen-sink-app",
  templateUrl: "./kitchen-sink-app.component.html",
  styleUrls: ["./kitchen-sink-app.component.scss"],
})
export class KitchenSinkAppComponent implements OnInit {
  userEmail: string = "phongpham";
  userPassword: string = "";
  // superHero1 = "https://data-us.cometchat.io/assets/images/avatars/ironman.png";
  // superHero2 =
  //   "https://data-us.cometchat.io/assets/images/avatars/captainamerica.png";
  // superHero3 =
  //   "https://data-us.cometchat.io/assets/images/avatars/spiderman.png";
  // superHero4 =
  //   "https://data-us.cometchat.io/assets/images/avatars/wolverine.png";
  // superHero5 = "https://data-us.cometchat.io/assets/images/avatars/cyclops.png";

  constructor(private router: Router, private authService: AuthenticationService, private formBuilder: FormBuilder) {}

  onLoginError: boolean = false;
  errorMsg: string = "";
  loginForm : FormGroup
  isValidFormSubmitted = null;


  ngOnInit() {
    //console.log('kitchen sink app loaded');
    //Create User
    // let  user = new CometChat.User('testing');
    // user.setName('Sohail');
    // CometChat.createUser(user, COMETCHAT_CONSTANTS.AUTH_KEY).then(
    //   user => {
    //       console.log("user created", user);
    //   },error => {
    //       console.log("error", error);
    //   }
    // )

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  /**
   * Get User info by using the UID for logging a user in
   * @param {String} UID
   */
  // onLogin(UID) {
  //   CometChat.login(UID, COMETCHAT_CONSTANTS.AUTH_KEY).then(
  //     (user) => {
  //       console.log("Login Successful:", { user });
  //       this.router.navigate(["/Home"]);
  //     },
  //     (error) => {
  //       console.log("Login failed with exception:", { error });
  //       this.onLoginError = true;
  //       this.errorMsg = error.message;
  //     }
  //   );
  // }

  
  // my code
  onLogin() {
    var email = this.loginForm.get('email').value
    var password = this.loginForm.get('password').value  
    this.isValidFormSubmitted = false;
    if (this.loginForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;

    // CometChat.login(email, COMETCHAT_CONSTANTS.AUTH_KEY).then(
    //   (user) => {
    //     console.log("Login Successful:", { user });
    //     this.router.navigate(["/embedded-app"]);
    //   },
    //   (error) => {
    //     console.log("Login failed with exception:", { error });
    //     this.onLoginError = true;
    //     this.errorMsg = error.message;
    //   }
    // );

    this.authService.signIn(email,password)
    
    // this.router.navigate(["/embedded-app"]);
  }

}
