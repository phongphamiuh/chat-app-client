import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../../../utils/enums";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import { logger } from "../../../../utils/common";
import { UserService } from "../../User-Service/user.service";
import { LocalStorageService } from "../../../Out-Service/local-storage.service";

@Component({
  selector: 'user-add-friends',
  templateUrl: './user-add-friends.component.html',
  styleUrls: ['./user-add-friends.component.css']
})
export class UserAddFriendsComponent implements OnInit {

  error = null;
  passwordInput: boolean = false;
  name: String = "";
  type: String = "";
  password = "";

  createBtnText: String = COMETCHAT_CONSTANTS.CREATE;
  addBtnText: String = COMETCHAT_CONSTANTS.ADD_FRIEND
  SELECT_GROUP_TYPE: String = COMETCHAT_CONSTANTS.SELECT_GROUP_TYPE;
  ENTER_GROUP_NAME: String = COMETCHAT_CONSTANTS.ENTER_GROUP_NAME;
  PUBLIC: String = COMETCHAT_CONSTANTS.PUBLIC;
  PRIVATE: String = COMETCHAT_CONSTANTS.PRIVATE;
  PASSWORD_PROTECTED: String = COMETCHAT_CONSTANTS.PASSWORD_PROTECTED;
  ENTER_GROUP_PASSWORD: String = COMETCHAT_CONSTANTS.ENTER_GROUP_PASSWORD;
  CREATE_GROUP: String = COMETCHAT_CONSTANTS.CREATE_GROUP;
  ADD_FRIENDS: String = COMETCHAT_CONSTANTS.ADD_FRIENDS
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  constructor(private userService: UserService,
              private localStorage: LocalStorageService) {}

  ngOnInit() {}

  /**
   * Changes the password according to the text entered by the user
   * @param Event event
   */
  passwordChangeHandler(event) {
    try {
      this.password = event.target.value;
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Changes the Group Name according to the text entered by the user
   * @param Event event
   */
  nameChangeHandler(event) {
    try {
      this.name = event.target.value;
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Changes the Type of group ,   according to the option seletced by the user by the user
   * @param Event event
   */
  typeChangeHandler(event) {
    try {
      this.type = event.target.value;

      if (this.type === enums.PROTECTED_GROUP) {
        this.passwordInput = true;
      } else {
        this.passwordInput = false;
      }
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Validates all the group details that were entered before creating the group
   * @param
   */
  validate = () => {
    try {
      const groupName = this.name.trim();
      const groupType = this.type.trim();

      if (!groupName) {
        this.error = COMETCHAT_CONSTANTS.GROUP_NAME_BLANK;
        return false;
      }

      if (!groupType) {
        this.error = COMETCHAT_CONSTANTS.GROUP_TYPE_BLANK;

        return false;
      }

      if (groupType === enums.PROTECTED_GROUP) {
        const password = this.password;

        if (!password.length) {
          this.error = COMETCHAT_CONSTANTS.GROUP_PASSWORD_BLANK;

          return false;
        }
      }
      return true;
    } catch (error) {
      logger(error);
    }
  };

  /**
   * If the Group Data is successfully validated , below function creates the group
   * @param
   */
   addFriends() {
    try {

      
      // if (!this.validate()) {
      //   return false;
      // }

      // if (this.createBtnText == COMETCHAT_CONSTANTS.CREATING_MESSSAGE) {
      //   return;
      // }

      // this.createBtnText = COMETCHAT_CONSTANTS.CREATING_MESSSAGE;

      // const groupType = this.type.trim();

      // const password = this.password;
      // const guid = enums.GROUP_ + new Date().getTime();
      // const name = this.name.trim();
      // let type = CometChat.GROUP_TYPE.PUBLIC;

      // switch (groupType) {
      //   case enums.PUBLIC_GROUP:
      //     type = CometChat.GROUP_TYPE.PUBLIC;
      //     break;
      //   case enums.PRIVATE_GROUP:
      //     type = CometChat.GROUP_TYPE.PRIVATE;
      //     break;
      //   case enums.PROTECTED_GROUP:
      //     type = CometChat.GROUP_TYPE.PASSWORD;
      //     break;
      //   default:
      //     break;
      // }

      // const group = new CometChat.Group(guid, name, type, password);

      // CometChat.createGroup(group)
      //   .then((group) => {
      //     this.resetGroupData();
      //     this.actionGenerated.emit({
      //       type: enums.GROUP_CREATED,
      //       payLoad: group,
      //     });
      //   })
      //   .catch((error) => {
      //     this.error = error;
      //   })
      //   .finally(() => {
      //     this.createBtnText = COMETCHAT_CONSTANTS.CREATE;
      //   });

      var uid = this.localStorage.get("uid")
      this.userService.getUserByPhone(this.name.trim()).subscribe(user => {
        if(user == null) this.error = "Bạn bè không tồn tại"
        else{
          this.userService.checkUserIsFriend(uid, user.id_user).subscribe(res => {
            if(res != null) this.error = "Người dùng này đã là bạn bè "
            else {
              alert('Gửi lời mời kết bạn thành công')
              this.userService.sendRequestAddFriend(uid,user.id_user).subscribe(res => {
                this.resetGroupData();
                this.actionGenerated.emit({
                  type: enums.GROUP_CREATED,
                  payLoad: user,
                });
              })

            }
          })
        }
      },error => {
        console.log(error)
      })

      // var uid = this.localStorage.get("uid")
      // this.userService.addFriend(uid,this.name.trim()).subscribe(user => {
      //     this.resetGroupData();
      //     this.actionGenerated.emit({
      //       type: enums.GROUP_CREATED,
      //       payLoad: user,
      //     });
      // },error => {
      //   this.error = "Bạn bè không tồn tại"
      // })
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Emits an action indicating the parent to close the create group view
   * @param
   */
  closeCreateGroupView() {
    try {
      this.actionGenerated.emit({
        type: enums.CLOSE_CREATE_GROUP_VIEW,
        payLoad: null,
      });
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Resets all the Group creation form data to initial values
   * @param
   */
  resetGroupData() {
    try {
      this.error = null;
      this.passwordInput = false;
      this.name = "";
      this.type = "";
      this.password = "";
    } catch (error) {
      logger(error);
    }
  }
}
