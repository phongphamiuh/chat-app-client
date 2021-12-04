import { NgModule } from "@angular/core";
import { AngularChatUiKitComponent } from "./angular-chat-ui-kit.component";
import { UserAddFriendsComponent } from './Users/User-Add-Friends/user-add-friends/user-add-friends.component';
import { ListRequestFriendsComponent } from './Users/List-Request-Friends/list-request-friends/list-request-friends.component';
import { ListMemberRequestFriendsComponent } from './Users/List-Member-Request-Friends/list-member-request-friends/list-member-request-friends.component';

@NgModule({
  declarations: [AngularChatUiKitComponent, 
    //UserAddFriendsComponent, ListRequestFriendsComponent, ListMemberRequestFriendsComponent
  ],
  imports: [],
  exports: [AngularChatUiKitComponent],
})
export class AngularChatUiKitModule {}
