import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CometChatAvatar } from "../../Shared/CometChat-avatar/cometchat-avatar.module";
import { CometChatDeleteMessageNoUserComponent } from "./comet-chat-delete-message-no-user.component";

@NgModule({
  declarations: [CometChatDeleteMessageNoUserComponent],
  imports: [CommonModule, CometChatAvatar],
  exports: [CometChatDeleteMessageNoUserComponent],
})
export class CometChatDeleteMessageBubbleNoUser {}
