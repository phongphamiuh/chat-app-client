import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatBackdrop } from "../../Shared/CometChat-backdrop/cometchat-backdrop.module";
import { ListMemberRequestFriendsComponent } from "./list-member-request-friends/list-member-request-friends.component";
import { CometChatAvatar } from "../../Shared/CometChat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [ListMemberRequestFriendsComponent],
  imports: [
      CommonModule, 
      CometChatBackdrop, 
      CometChatAvatar],
  exports: [ListMemberRequestFriendsComponent],
})
export class CometChatListMemberRequestFriends {}