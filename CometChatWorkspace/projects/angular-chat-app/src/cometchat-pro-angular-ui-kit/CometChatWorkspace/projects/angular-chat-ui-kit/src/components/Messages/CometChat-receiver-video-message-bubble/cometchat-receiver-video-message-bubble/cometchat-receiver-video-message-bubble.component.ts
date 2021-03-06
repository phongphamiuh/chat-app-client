import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../../utils/common";
import * as enums from "../../../../utils/enums";
import { logger } from "../../../../utils/common";
import { CometChat } from "@cometchat-pro/chat";
import { UserService } from "../../../Users/User-Service/user.service";

@Component({
  selector: "cometchat-receiver-video-message-bubble",
  templateUrl: "./cometchat-receiver-video-message-bubble.component.html",
  styleUrls: ["./cometchat-receiver-video-message-bubble.component.css"],
})
export class CometChatReceiverVideoMessageBubbleComponent implements OnInit {
  @Input() messageDetails = null;
  @Input() showToolTip = true;
  @Input() showReplyCount = true;
  @Input() loggedInUser;
  @Input() type: String = "";
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  avatar = null;
  name: string = null;

  videoUrl: string;

  checkReaction = [];

  avatarIfGroup: boolean = false;

  message = Object.assign({}, this.messageDetails, {
    messageFrom: enums.RECEIVER,
  });

  username: string = '';

  GROUP: String = CometChat.RECEIVER_TYPE.GROUP;

  constructor(private userService: UserService) {}

  ngOnInit() {
    try {
      this.checkReaction = checkMessageForExtensionsData(
        this.messageDetails,
        enums.REACTIONS
      );

      this.userService.getUserById1(this.messageDetails.id_send).subscribe(user => {
          this.username = user.name
      })

      /**
       *  If Group then displays Avatar And Name
       */
      if (this.messageDetails.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
        this.avatarIfGroup = true;
        if (!this.messageDetails.sender.avatar) {
          const uid = this.messageDetails.sender.getUid();
          const char = this.messageDetails.sender.getName().charAt(0);
        }
        this.name = this.messageDetails.sender.name;
        this.avatar = this.messageDetails.sender.avatar;
      }
      this.getUrl();
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Gets the url of video to be displayed
   */
  getUrl() {
    try {
      this.videoUrl = this.messageDetails.fileUrl;
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
