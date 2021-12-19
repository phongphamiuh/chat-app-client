import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import * as enums from "../../../../utils/enums";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
import { User, UserService } from "../../User-Service/user.service";
import { LocalStorageService } from "../../../Out-Service/local-storage.service";
@Component({
  selector: "cometchat-user-details",
  templateUrl: "./cometchat-user-details.component.html",
  styleUrls: ["./cometchat-user-details.component.css"],
})
export class CometChatUserDetailsComponent implements OnInit, OnChanges {
  @Input() item = null;
  @Input() type = null;
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  OPTIONS: String = COMETCHAT_CONSTANTS.OPTIONS;
  DETAILS: String = COMETCHAT_CONSTANTS.DETAILS;
  DELETEFRIEND: String = COMETCHAT_CONSTANTS.DELETE_FRIEND;
  blockUserText: string;
  
  constructor(private userService: UserService,
              private localStorage: LocalStorageService) {}

  ngOnChanges(change: SimpleChanges) {
    try {
        console.log("user" + JSON.stringify(this.item))
      this.userService.getUserById1(this.item.id_user).subscribe(user => {
        
      })
      // if (change[enums.ITEM]) {
      //   this.getBlockStatus(change[enums.ITEM].currentValue);
      // }


    } catch (error) {
      logger(error);
    }
  }
  ngOnInit() {}

  /**
   * Gets Status If user is Blocked/Unblocked
   * @param
   */
  getBlockStatus(item) {
    try {
      if (item.blockedByMe) {
        this.blockUserText = COMETCHAT_CONSTANTS.UNBLOCK_USER;
      } else {
        this.blockUserText = COMETCHAT_CONSTANTS.BLOCK_USER;
      }
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Toggle Block/Unblock
   */
  toggleBlockUser() {
    try {
      if (this.blockUserText === COMETCHAT_CONSTANTS.BLOCK_USER) {
        this.actionGenerated.emit({
          type: enums.BLOCK_USER,
        });
      } else if (this.blockUserText === COMETCHAT_CONSTANTS.UNBLOCK_USER) {
        this.actionGenerated.emit({
          type: enums.UNBLOCK_USER,
        });
      }
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Close thread when opened in small screen
   */
  closeThreadView() {
    try {
      this.actionGenerated.emit({
        type: enums.CLOSE_DETAIL_CLICKED,
      });
    } catch (error) {
      logger(error);
    }
  }

  deleteUser(){
    if(confirm("Bạn có chắc chắn muốn xóa không")) {
      let uid = this.localStorage.get("uid")
      console.log(this.item.id_user)
      this.userService.getUserNotPersonal(this.item.id_chatroom,uid).subscribe(user => {
        this.userService.deleteFriend(uid, user.id_user).subscribe(message => {
          console.log("deleteUser" + message)
         window.location.reload()
        })
        
      })
      
    }
  }
}
