import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatUserListComponent } from "./cometchat-user-list/cometchat-user-list.component";

import { CometChatAvatar } from "../../Shared/CometChat-avatar/cometchat-avatar.module";
import { CometChatUserAddFriends } from "../User-Add-Friends/user-add-friends.module";
import { CometChatListRequestFriends } from "../List-Request-Friends/list-request-friends.module";

@NgModule({
  declarations: [CometChatUserListComponent],
  imports: [CommonModule, CometChatAvatar, CometChatUserAddFriends, CometChatListRequestFriends],
  exports: [CometChatUserListComponent],
})
export class CometChatUserList {}
