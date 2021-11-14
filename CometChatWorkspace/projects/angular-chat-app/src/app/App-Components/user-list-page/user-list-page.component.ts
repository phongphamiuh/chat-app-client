import { Component, OnInit } from "@angular/core";
import { UserService } from "projects/angular-chat-app/src/cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/Users/User-Service/user.service";

@Component({
  selector: "app-user-list-page",
  templateUrl: "./user-list-page.component.html",
  styleUrls: ["./user-list-page.component.scss"],
})
export class UserListPageComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {}

  userClicked(user) {
    console.log(`user in parent component  `, user);
  }
}
