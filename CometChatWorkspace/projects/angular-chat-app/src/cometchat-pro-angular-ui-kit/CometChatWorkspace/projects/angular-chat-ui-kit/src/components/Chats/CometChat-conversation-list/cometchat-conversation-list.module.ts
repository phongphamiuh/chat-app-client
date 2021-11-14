import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatConversationListComponent } from "./cometchat-conversation-list/cometchat-conversation-list.component";
import { CometChatConversationListItem } from "../CometChat-conversation-list-item/cometchat-conversation-list-item.module";
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [CometChatConversationListComponent],
  imports: [
    CommonModule, 
    CometChatConversationListItem,
    HttpClientModule
  ],
  exports: [CometChatConversationListComponent],
})
export class CometChatConversationList {}
