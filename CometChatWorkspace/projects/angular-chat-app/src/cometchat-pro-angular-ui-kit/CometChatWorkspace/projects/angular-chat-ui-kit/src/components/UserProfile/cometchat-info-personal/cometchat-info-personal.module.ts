import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatAvatar } from "../../Shared/CometChat-avatar/cometchat-avatar.module";
import { CometchatInfoPersonalComponent } from "./cometchat-info-personal.component";
import { CometChatBackdrop } from "../../Shared/CometChat-backdrop/cometchat-backdrop.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [CometchatInfoPersonalComponent],
  imports: [CommonModule, CometChatAvatar,CometChatBackdrop,
FormsModule, ReactiveFormsModule, BrowserModule, CometChatAvatar],
  exports: [CometchatInfoPersonalComponent],
})
export class CometChatInfoPersonalModule {}