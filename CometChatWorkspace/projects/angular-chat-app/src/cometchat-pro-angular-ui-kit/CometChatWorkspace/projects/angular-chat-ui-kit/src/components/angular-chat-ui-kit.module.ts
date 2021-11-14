import { NgModule } from "@angular/core";
import { AngularChatUiKitComponent } from "./angular-chat-ui-kit.component";
import { UserAddFriendsComponent } from './Users/User-Add-Friends/user-add-friends/user-add-friends.component';

@NgModule({
  declarations: [AngularChatUiKitComponent, UserAddFriendsComponent],
  imports: [],
  exports: [AngularChatUiKitComponent],
})
export class AngularChatUiKitModule {}
