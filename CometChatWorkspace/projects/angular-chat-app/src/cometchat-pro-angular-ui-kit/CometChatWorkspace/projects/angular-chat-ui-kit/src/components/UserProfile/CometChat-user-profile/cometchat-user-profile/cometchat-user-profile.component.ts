import { Component, ElementRef, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
import { UpdateImgRequest, UserService } from "../../../Users/User-Service/user.service";
import { LocalStorageService } from "../../../Out-Service/local-storage.service";
import { Router } from "@angular/router";
import { MessageService, MessagesFile } from "../../../Messages/Message-Service/message.service";

import * as enums from "../../../../utils/enums";
@Component({
  selector: "cometchat-user-profile",
  templateUrl: "./cometchat-user-profile.component.html",
  styleUrls: ["./cometchat-user-profile.component.css"],
})
export class CometChatUserProfileComponent implements OnInit, OnChanges {
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  @ViewChild("imagePicker", { static: false }) imagePicker: ElementRef;
  openUpdateProfile: boolean = false;
  user;
  name: string;
  APP_INFO = COMETCHAT_CONSTANTS.PERSON_INFO;
  MORE: String = COMETCHAT_CONSTANTS.MORE;
  ONLINE: String = COMETCHAT_CONSTANTS.ONLINE;
  PREFERENCES: String = COMETCHAT_CONSTANTS.PREFERENCES;
  NOTIFICATIONS: String = COMETCHAT_CONSTANTS.NOTIFICATIONS;
  PRIVACY_AND_SECURITY: String = COMETCHAT_CONSTANTS.PRIVACY_AND_SECURITY;
  CHATS: String = COMETCHAT_CONSTANTS.CHATS;
  OTHER: String = COMETCHAT_CONSTANTS.OTHER;
  HELP: String = COMETCHAT_CONSTANTS.HELP;
  REPORT_PROBLEM: String = COMETCHAT_CONSTANTS.REPORT_PROBLEM;
  PERSON_INFO: String = COMETCHAT_CONSTANTS.PERSON_INFO;
  LOGOUT: String = COMETCHAT_CONSTANTS.LOGOUT;
  constructor(private userService: UserService, private localStorage: LocalStorageService,
    private route: Router, private messageService: MessageService) {}

  ngOnInit() {
    try {
      this.getProfile();
    } catch (error) {
      logger(error);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  uid : String;


  /**
   * Get Info Of LoggedIn User
   */
  getProfile() {
    try {
      this.uid = this.localStorage.get("uid")
      this.userService.getUserById1(this.uid).subscribe(user => {
        this.user = user
        this.name = user.name
      },error => {
        logger(
          "[CometChatUserInfoScreen] getProfile getLoggedInUser error",
          error
        );
      })
    } catch (error) {
      logger(error);
    }
  }

  showInfoP(){
    try {
      this.openUpdateProfile = !this.openUpdateProfile;
    } catch (error) {
      logger(error);
    }
  
  }

  updateInfo(){
    this.getProfile()
    this.showInfoP()
  }

  actionHandler(action) {
    try {
      let data = action.payLoad;

      switch (action.type) {
        case enums.UPDATE_INFO: {
          this.updateInfo();
          break;
        }
       

      }
    } catch (error) {
      logger(error);
    }
  }

  logout(){
    this.localStorage.remove("uid")
    this.localStorage.remove("name")
    this.localStorage.remove("status")
    this.route.navigateByUrl("/login")
  }



  onImgChange(event) {
    try {
      if (!event.target.files[0]) {
        return false;
      }
      const uploadedFile = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener(
        enums.LOAD,
        () => {
          const newFile = new File(
            [reader.result],
            uploadedFile.name,
            uploadedFile
          );

          this.messageService.updateFile(newFile).subscribe(res => {
            let ms = Date.now();
            console.log('res..............................' + JSON.stringify(res))
            let resI = res.url 

            this.user
            let urlUpdate: UpdateImgRequest = {
              url_avatar : resI
            }
            this.userService.update(this.uid, urlUpdate).subscribe(res => {
              console.log('update' + res)
            })

          })

         // this.sendMediaMessage(newFile, CometChat.MESSAGE_TYPE.IMAGE);
        },
        false
      );

      reader.readAsArrayBuffer(uploadedFile);

      this.getProfile()

     // this.imagePicker.nativeElement.value = "";
    } catch (error) {
      logger(error);
    }
  }
  
  // getImage() {
  //   try {
  //     this.imagePicker.nativeElement.click();
  //   } catch (error) {
  //     logger(error);
  //   }
  // }
}
