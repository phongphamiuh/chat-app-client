import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as enums from "../../../../utils/enums";
import { logger } from "../../../../utils/common";
import { LocalStorageService } from '../../../Out-Service/local-storage.service';
import { UserService } from '../../User-Service/user.service';
import { COMETCHAT_CONSTANTS } from "../../../../utils/messageConstants";
@Component({
  selector: 'list-request-friends',
  templateUrl: './list-request-friends.component.html',
  styleUrls: ['./list-request-friends.component.css']
})
export class ListRequestFriendsComponent implements OnInit {
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();
  
  userlist = [];
  filteredList = [];
  LIST_ADD_FRIEND: String = COMETCHAT_CONSTANTS.LIST_ADD_FRIEND
  constructor(private localStorage: LocalStorageService,
    private userService: UserService) { }

  ngOnInit() {
    this.getListRequestFriends()
  }

   /**
   * Handles all the events emitted by child components
   * @param Event action
   */
    actionHandler(action) {
      try {
        let data = action.payLoad;
  
        switch (action.type) {
          case enums.DELETE_REQUEST_FRIEND: {
            this.deleteFriend(data.user);
            break;
          }
          case enums.Confirm_REQUEST_FRIEND: {
            this.confirmFriend(data.user);
            break;
          }
        }
      } catch (error) {
        logger(error);
      }
    }

    deleteFriend = (user) => {
      console.log('delete .......................')
      var uid = this.localStorage.get('uid')
      this.userService.deleteRequestFriends(user.id_user, uid).subscribe(message => {
        alert('Xóa lời mới kết bạn thành công')
        this.actionGenerated.emit({
          type: enums.UPDATE_DELETE_LIST_CONTACT,
          payload: null
        })
      })
    }

    confirmFriend = (user) => {
      var uid = this.localStorage.get('uid')
      this.userService.confirmRequestFriends(uid, user.id_user).subscribe(message => {
        alert('Thêm bạn thành công')
      })

      this.userService.addChatRoom(uid, user.id_user).subscribe(messae => {
        this.actionGenerated.emit({
          type: enums.UPDATE_LIST_CONTACT,
          payLoad: { user: user},
        });

      })
    }
  

   /**
   * Emits an action indicating the parent to close the create group view
   * @param
   */
    closeCreateGroupView() {
      try {
        this.actionGenerated.emit({
          type: enums.CLOSE_LIST_REQUEST_FRIENDS,
          payLoad: null,
        });
      } catch (error) {
        logger(error);
      }
    }

     /**
   * fetches a list of users based on the member request config
   * @param
   */
  getListRequestFriends = () => {
    try {
      var uid = this.localStorage.get('uid')
      this.userService.getAllListRequestFriends(uid).subscribe(userList => {
        this.filteredList = [...this.userlist, ...userList];

        //this.filteredList = [...this.userlist];
      },error => {
        //this.decoratorMessage = COMETCHAT_CONSTANTS.ERROR;
        logger("[CometChatAddMembers] getUsers fetchNext error", error);
      })
    } catch (error) {
      logger(error);
    }
  };

}
