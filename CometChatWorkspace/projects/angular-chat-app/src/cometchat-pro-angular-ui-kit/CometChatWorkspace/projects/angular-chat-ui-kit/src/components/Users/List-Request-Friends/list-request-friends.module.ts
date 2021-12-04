import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatBackdrop } from "../../Shared/CometChat-backdrop/cometchat-backdrop.module";
import { ListRequestFriendsComponent } from "./list-request-friends/list-request-friends.component";
import { CometChatListMemberRequestFriends } from "../List-Member-Request-Friends/list-member-request-friends.module";

@NgModule({
  declarations: [ListRequestFriendsComponent],
  imports: [
    CommonModule, 
    CometChatBackdrop, 
    CometChatListMemberRequestFriends
  ],
  exports: [ListRequestFriendsComponent],
})
export class CometChatListRequestFriends {}