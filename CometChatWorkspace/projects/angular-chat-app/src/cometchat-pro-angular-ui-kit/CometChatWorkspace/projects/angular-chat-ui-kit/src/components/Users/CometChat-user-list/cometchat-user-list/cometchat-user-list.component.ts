import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  SimpleChanges,
} from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
import * as enums from "../../../../utils/enums";
import { logger } from "../../../../utils/common";
import { UserService } from "../../User-Service/user.service";
import { LocalStorageService } from "../../../Out-Service/local-storage.service";
import { JsonPipe } from "@angular/common";
import { MessageService } from "../../../Messages/Message-Service/message.service";
@Component({
  selector: "cometchat-user-list",
  templateUrl: "./cometchat-user-list.component.html",
  styleUrls: ["./cometchat-user-list.component.css"],
})
export class CometChatUserListComponent
  implements OnInit, OnDestroy, OnChanges {
  @Input() friendsOnly = false;
  @Input() hasActions = false;
  @Input() item = null;

  @Output() onUserClick: EventEmitter<any> = new EventEmitter();
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  userListenerId = enums.USER_LIST_ + new Date().getTime();

  decoratorMsg: string = COMETCHAT_CONSTANTS.LOADING_MESSSAGE;
  userSearches: boolean = false;
  loader: Boolean = true;
  contactsNotFound: Boolean = false;
  contacts = [];
  usersList = [];
  filteredList = [];
  userlist = [];
  usersRequest;
  timeout;
  defaultAvatarImage =
    "https://data-eu.cometchat.io/assets/images/avatars/spiderman.png";

  USERS: String = COMETCHAT_CONSTANTS.USERS;
  SEARCH: String = COMETCHAT_CONSTANTS.SEARCH;
  LIST_ADD_FRIEND = COMETCHAT_CONSTANTS.LIST_ADD_FRIEND
  openAddFriendsView: boolean = false;
  openListRequestFriends: boolean = false;
  constructor(private ref: ChangeDetectorRef,
              private userService: UserService,
              private localStorageService: LocalStorageService,
              private messageService: MessageService) {
    try {
      setInterval(() => {
        if (!this.ref[enums.DESTROYED]) {
          this.ref.detectChanges();
        }
      }, 5000);
    } catch (error) {
      logger(error);
    }
  }

  ngOnChanges(change: SimpleChanges) {
    try {
      // if (change[enums.ITEM]) {
      //   if (
      //     change[enums.ITEM].previousValue !== change[enums.ITEM].currentValue
      //   ) {
      //     const userlist = [...this.usersList];

      //     let userKey = userlist.findIndex(
      //       (u, k) => u.uid === change[enums.ITEM].currentValue.uid
      //     );

      //     //if found in the list, update user object
      //     if (userKey > -1) {
      //       let userObj = userlist[userKey];
      //       let newUserObj = Object.assign(
      //         {},
      //         userObj,
      //         change[enums.ITEM].currentValue
      //       );
      //       userlist.splice(userKey, 1, newUserObj);
      //       this.usersList = [...userlist];
      //     }
      //   }
      // }
    } catch (error) {
      logger(error);
    }
  }

  ngOnInit() {
    console.log("user list" + JSON.stringify(this.usersList))
    try {
      this.usersRequest = new CometChat.UsersRequestBuilder()
        .friendsOnly(this.friendsOnly)
        .setLimit(60)
        .build();

      let user = CometChat.getLoggedinUser().then(
        (user) => {
          this.fetchNextContactList();
        },
        (error) => {
          logger("error getting details:", { error });
        }
      );

      //Attaching User Listeners to dynamilcally update when a user comes online and goes offline
      CometChat.addUserListener(
        this.userListenerId,
        new CometChat.UserListener({
          onUserOnline: (onlineUser) => {
            /* when someuser/friend comes online, user will be received here */

            this.userUpdated(onlineUser);
          },
          onUserOffline: (offlineUser) => {
            /* when someuser/friend went offline, user will be received here */

            this.userUpdated(offlineUser);
          },
        })
      );
      
    } catch (error) {
      logger(error);
    }
  }

  ngOnDestroy() {
    try {
      // removinf the changeDetector Ref
      this.ref.detach();

      CometChat.removeUserListener(this.userListenerId);
      this.userListenerId = null;
      this.usersRequest = null;
    } catch (error) {
      logger(error);
    }
  }

   /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
    actionHandler(action) {
      try {
        let data = action.payLoad;
  
        switch (action.type) {
          case enums.CLOSE_CREATE_GROUP_VIEW: {
            this.toggleAddFriendsView();
            break;
          }
          case enums.CLOSE_LIST_REQUEST_FRIENDS: {
            this.toggleListAddFriendsView();
            break;
          }
          case enums.GROUP_CREATED: {
            this.toggleAddFriendsView();
           //s this.createGroupActionHandler(data);
            break;
          }

          case enums.UPDATE_LIST_CONTACT: {
            this.userUpdateWhenAddFriend(data.user)
            //this.fetchNextContactList();
            break;
          }
          case enums.UPDATE_DELETE_LIST_CONTACT: {
            this.toggleListAddFriendsView();
            break;
          }

        }
      } catch (error) {
        logger(error);
      }
    }
    
  
  /**
   * Search User Based on their Name
   * @param String searchKey
   */
  searchUsers(searchKey) {
    try {
      this.contactsNotFound = false;
      this.decoratorMsg = COMETCHAT_CONSTANTS.LOADING_MESSSAGE;

      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.userSearches = true;
      this.loader = true;
      let val = searchKey;
      this.timeout = setTimeout(() => {
        //Empty Intial User List before searching user list according to search key
        this.usersList = [];

        this.usersRequest = new CometChat.UsersRequestBuilder()
          .friendsOnly(this.friendsOnly)
          .setSearchKeyword(searchKey)
          .setLimit(30)
          .build();

        this.fetchNextContactList();
      }, 500);
    } catch (error) {
      logger(error);
    }
  }

  /**
   * If User scrolls to the bottom of the current Contact list than fetch next items of the contact list and append
   * @param Event e
   */
  handleScroll(e) {
    try {
      const bottom =
        Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
        Math.round(e.currentTarget.clientHeight);

      if (bottom) this.fetchNextContactList();
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Get List of users that are contacts of the current user
   *
   */
  fetchNextContactList() {
    try {
      var uid = this.localStorageService.get("uid")
      this.userService.getConverByUserId(uid).subscribe(userList => {

        if (userList.length === 0 && this.userSearches === true) { 
          this.contactsNotFound = true;
          this.decoratorMsg = COMETCHAT_CONSTANTS.NO_USERS_FOUND;
        } else {
          this.userSearches = false;
          this.usersList = [...this.usersList, ...userList];
          this.loader = false;
        }
      },error => {
        logger("User list fetching failed with error:", error);
      })

    } catch (error) {
      logger(error);
    }
  }

  userUpdateWhenAddFriend = (user) => {

    var uid = this.localStorageService.get("uid")
    this.userService.getConverByUserId(uid).subscribe(userList => {
      this.usersList = []
      this.usersList = [...this.usersList, ...userList];
    },error => {
      logger("User list fetching failed with error:", error);
    })
    this.toggleListAddFriendsView();
  }

  /**
   * This function updates the status ( online / offline ) , in real-time when getting signals from the listerners
   * @param Any user
   */
  userUpdated = (user) => {
    try {
      let userlist = [...this.usersList];

      //search for user
      let userKey = userlist.findIndex((u, k) => u.uid === user.uid);

      //if found in the list, update user object
      if (userKey > -1) {
        let userObj = { ...userlist[userKey] };
        let newUserObj = { ...userObj, ...user };
        userlist.splice(userKey, 1, newUserObj);

        this.usersList = [...userlist];
      }
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Emitting the user clicked so that it can be used in the parent component
   * @param Any userToEmit
   */
  onUserClicked(userToEmit) {
    try {
      this.onUserClick.emit(userToEmit);
      this.messageService.removeMessageListener(this.item.id_chatroom)
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Emitting the close Menu action to be used in parent component to handle screen logic
   * @param
   */
  handleMenuClose = () => {
    try {
      if (!this.hasActions) {
        return false;
      }

      this.actionGenerated.emit({ type: enums.CLOSE_MENU_CLICKED });
    } catch (error) {
      logger(error);
    }
  };


  /**
   * toggles between opening and closing of AddFriendsView 
   * @param
   */
   toggleAddFriendsView() {
    try {
      this.openAddFriendsView = !this.openAddFriendsView;
    } catch (error) {
      logger(error);
    }
  }

  toggleListAddFriendsView(){
    try {
      this.openListRequestFriends = !this.openListRequestFriends;
    } catch (error) {
      logger(error);
    }
  }

}
