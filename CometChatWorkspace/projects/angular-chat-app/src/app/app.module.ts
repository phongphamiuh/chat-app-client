import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { KitchenSinkAppComponent } from "./App-Components/kitchen-sink-app/kitchen-sink-app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomePageComponent } from "./App-Components/home-page/home-page.component";
import { UserListPageComponent } from "./App-Components/user-list-page/user-list-page.component";
import { CometChatConversationListPageComponent } from "./App-Components/Pages/comet-chat-conversation-list-page/comet-chat-conversation-list-page.component";
import { UserListScreenPageComponent } from "./App-Components/user-list-screen-page/user-list-screen-page.component";
import { CometChatMessageComposerPageComponent } from "./App-Components/Pages/comet-chat-message-composer-page/comet-chat-message-composer-page.component";
import { CometChatGroupListScreenPageComponent } from "./App-Components/Pages/comet-chat-group-list-screen-page/comet-chat-group-list-screen-page.component";
import { CometChatConversationListScreenPageComponent } from "./App-Components/Pages/comet-chat-conversation-list-screen-page/comet-chat-conversation-list-screen-page.component";
import { GroupListComponent } from "./App-Components/Pages/group-list/group-list.component";
import { GroupListScreenPageComponent } from "./App-Components/Pages/group-list-screen-page/group-list-screen-page.component";
import { CometChatUnifiedPageComponent } from "./App-Components/Pages/comet-chat-unified-page/comet-chat-unified-page.component";

import { CometChatConversationList } from "../cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/Chats/CometChat-conversation-list/cometchat-conversation-list.module";
import { CometChatConversationListWithMessages } from "../cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/Chats/CometChat-conversation-list-with-messages/cometchat-conversation-list-with-messages.module";
import { CometChatGroupList } from "../cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/Groups/CometChat-group-list/cometchat-group-list.module";
import { CometChatGroupListWithMessages } from "../cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/Groups/CometChat-group-list-with-messages/cometchat-group-list-with-messages.module";
import { CometChatUI } from "../cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/CometChatUI/CometChat-Ui/cometchat-ui.module";
import { CometChatUserList } from "../cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/Users/CometChat-user-list/cometchat-user-list.module";
import { CometChatUserListWithMessages } from "../cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/Users/CometChat-user-list-with-messages/cometchat-user-list-with-messages.module";
import { CometChatAvatar } from "../cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/Shared/CometChat-avatar/cometchat-avatar.module";
import { RegisterPageComponent } from "./App-Components/register-page/register-page.component";
import { AngularFireModule } from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth"
import { FIREBASE_CONFIG } from '../CONSTS';
@NgModule({
  declarations: [
    AppComponent,
    KitchenSinkAppComponent,
    HomePageComponent,
    UserListPageComponent,
    CometChatConversationListPageComponent,
    UserListScreenPageComponent,
    CometChatMessageComposerPageComponent,
    CometChatGroupListScreenPageComponent,
    CometChatConversationListScreenPageComponent,
    GroupListComponent,
    GroupListScreenPageComponent,
    CometChatUnifiedPageComponent,

    //mycode
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CometChatUI,
    CometChatConversationListWithMessages,
    CometChatGroupListWithMessages,
    CometChatUserListWithMessages,
    CometChatConversationList,
    CometChatGroupList,
    CometChatUserList,
    CometChatAvatar,
    FormsModule,
    ReactiveFormsModule,

    // firebase
    AngularFireModule.initializeApp(FIREBASE_CONFIG,'chatapp'),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
