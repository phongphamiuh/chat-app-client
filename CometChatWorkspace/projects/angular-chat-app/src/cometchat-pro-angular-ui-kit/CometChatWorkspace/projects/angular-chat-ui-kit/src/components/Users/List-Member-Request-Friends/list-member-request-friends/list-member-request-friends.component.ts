import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalStorageService } from '../../../Out-Service/local-storage.service';
import { UserService } from '../../User-Service/user.service';
import * as enums from "../../../../utils/enums";
@Component({
  selector: 'list-member-request-friends',
  templateUrl: './list-member-request-friends.component.html',
  styleUrls: ['./list-member-request-friends.component.css']
})
export class ListMemberRequestFriendsComponent implements OnInit {

  @Input() item = null;
  @Input() type = null;
  @Input() user = null;
  @Input() members = null;

  checked: boolean = false;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {

  }

  ngOnInit() {
    console.log("user : " + this.user)
    try {
      this.checked = this.members.find(
        (member) => member.uid === this.user.uid
      );
    } catch (error) {
      
    }
  }

  /**
   * toggle the checkbox for each users , that is, to add them or not to add them in the group
   * @param Event event
   */
  handleCheck(event) {
    try {
      this.checked = !this.checked;

      // this.actionGenerated.emit({
      //   type: enums.MEMBER_UPDATED,
      //   payLoad: { user: this.user, userState: this.checked },
      // });
    } catch (error) {
      //logger(error);
    }
  }

  confirmFriend(){
    var uid = this.localStorageService.get('uid')
    //this.userService.confirmRequestFriends(this.user.id_user, uid)
    this.actionGenerated.emit({
      type: enums.Confirm_REQUEST_FRIEND,
      payLoad: { user: this.user},
    });
  }

  deleteFriend(){
    var uid = this.localStorageService.get('uid')

    this.actionGenerated.emit({
      type: enums.DELETE_REQUEST_FRIEND,
      payLoad: { user: this.user},
    });
    //this.userService.deleteRequestFriends(this.user.id_user, uid).subscribe(message => {
     
    //})
  }

  
}
