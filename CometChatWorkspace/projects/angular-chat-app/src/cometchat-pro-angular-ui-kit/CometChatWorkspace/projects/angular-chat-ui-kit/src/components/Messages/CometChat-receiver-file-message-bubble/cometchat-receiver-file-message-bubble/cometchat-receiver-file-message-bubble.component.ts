import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../../utils/common";
import * as enums from "../../../../utils/enums";
import { logger } from "../../../../utils/common";
import { CometChat } from "@cometchat-pro/chat";
import { User, UserService } from "../../../Users/User-Service/user.service";

@Component({
  selector: "cometchat-receiver-file-message-bubble",
  templateUrl: "./cometchat-receiver-file-message-bubble.component.html",
  styleUrls: ["./cometchat-receiver-file-message-bubble.component.css"],
})
export class CometChatReceiverFileMessageBubbleComponent implements OnInit {
  @Input() messageDetails = null;
  name: string;
  url: string;
  @Input() type: String = "";
  avatar = null;
  avatarName: string = null;
  avatarIfGroup: boolean = false;
  checkReaction = [];

  @Input() showReplyCount = true;

  @Input() showToolTip = true;
  @Input() loggedInUser;
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  GROUP: String = CometChat.RECEIVER_TYPE.GROUP;
  user = null
  constructor(private userService: UserService) {}

  ngOnInit() {
    try {

      this.userService.getUserById1(this.messageDetails.id_send).subscribe(user => {
        this.user = user;
      })

      this.checkReaction = checkMessageForExtensionsData(
        this.messageDetails,
        enums.REACTIONS
      );
      this.avatarIfGroup = true;
      this.userService.getUserById1(this.messageDetails.id_send).subscribe(user => {
        this.user = user;
        this.avatarName = user.name
        //this.avatar = this.messageDetails.sender.avatar;
      })
      //If Group then displays Avatar And Name
      if (this.messageDetails.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
        this.avatarIfGroup = true;
        if (!this.messageDetails.sender.avatar) {
          const uid = this.messageDetails.sender.getUid();
          const char = this.messageDetails.sender
            .getName()
            .charAt(0)
            .toUpperCase();
        }
        this.avatarName = this.messageDetails.sender.name;
        this.avatar = this.messageDetails.sender.avatar;
      }
      //Gets File name and file url
      this.url = this.messageDetails.fileUrl;
      this.name = this.messageDetails.message;
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
      this.actionGenerated.emit(action);
    } catch (error) {
      logger(error);
    }
  }
}
