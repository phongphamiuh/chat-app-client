import { NgModule } from "@angular/core";
import { AngularChatUiKitComponent } from "./angular-chat-ui-kit.component";
import { UserAddFriendsComponent } from './Users/User-Add-Friends/user-add-friends/user-add-friends.component';
import { ListRequestFriendsComponent } from './Users/List-Request-Friends/list-request-friends/list-request-friends.component';
import { ListMemberRequestFriendsComponent } from './Users/List-Member-Request-Friends/list-member-request-friends/list-member-request-friends.component';
import { CometChatDeleteMessageNoUserComponent } from './Messages/comet-chat-delete-message-no-user/comet-chat-delete-message-no-user.component';
import { CometchatInfoPersonalComponent } from './UserProfile/cometchat-info-personal/cometchat-info-personal.component';

@NgModule({
  declarations: [AngularChatUiKitComponent, CometChatDeleteMessageNoUserComponent, CometchatInfoPersonalComponent, 
    //UserAddFriendsComponent, ListRequestFriendsComponent, ListMemberRequestFriendsComponent
  ],
  imports: [],
  exports: [AngularChatUiKitComponent],
})
export class AngularChatUiKitModule {}
