import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserAddFriendsComponent } from "./user-add-friends/user-add-friends.component";
import { CometChatBackdrop } from "../../Shared/CometChat-backdrop/cometchat-backdrop.module";

@NgModule({
  declarations: [UserAddFriendsComponent],
  imports: [CommonModule, CometChatBackdrop],
  exports: [UserAddFriendsComponent],
})
export class CometChatUserAddFriends {}