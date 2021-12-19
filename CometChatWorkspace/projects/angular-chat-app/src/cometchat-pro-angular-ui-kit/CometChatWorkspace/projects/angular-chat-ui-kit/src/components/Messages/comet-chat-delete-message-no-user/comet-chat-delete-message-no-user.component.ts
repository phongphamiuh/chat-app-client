import { Component, Input, OnInit } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';
import { getSentAtTime } from "../../../utils/common";
import { COMETCHAT_CONSTANTS } from "../../../utils/messageConstants";
@Component({
  selector: 'comet-chat-delete-message-no-user',
  templateUrl: './comet-chat-delete-message-no-user.component.html',
  styleUrls: ['./comet-chat-delete-message-no-user.component.css']
})
export class CometChatDeleteMessageNoUserComponent implements OnInit {
  @Input() messageDetails = null;

  @Input() loggedInUser = null;

  loggedInUserDeletedThisMessage: boolean = false;

  time;

  GROUP: String = CometChat.RECEIVER_TYPE.GROUP;
  THIS_MESSAGE_DELETED: String = COMETCHAT_CONSTANTS.THIS_MESSAGE_DELETED;
  YOU_DELETED_THIS_MESSAGE: String =
    COMETCHAT_CONSTANTS.YOU_DELETED_THIS_MESSAGE;
  constructor() {

  }

  ngOnInit() {
    this.loggedInUserDeletedThisMessage = false;
    //  if (this.messageDetails.deletedBy === this.loggedInUser.id_user) {
    //     this.loggedInUserDeletedThisMessage = true;
    //   }
      this.time = getSentAtTime(this.messageDetails);
  }

}
