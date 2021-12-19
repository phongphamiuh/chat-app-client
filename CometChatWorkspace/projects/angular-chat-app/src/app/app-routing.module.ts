import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { KitchenSinkAppComponent } from "./App-Components/kitchen-sink-app/kitchen-sink-app.component";
// import { GroupListComponent } from "./App-Components/Pages/group-list/group-list.component";
// import { UserListPageComponent } from "./App-Components/user-list-page/user-list-page.component";
// import { UserListScreenPageComponent } from "./App-Components/user-list-screen-page/user-list-screen-page.component";
// import { GroupListScreenPageComponent } from "./App-Components/Pages/group-list-screen-page/group-list-screen-page.component";
import { CometChatUnifiedPageComponent } from "./App-Components/Pages/comet-chat-unified-page/comet-chat-unified-page.component";
import { RegisterPageComponent } from "./App-Components/register-page/register-page.component";
import { AuGuardService } from "./Services/au-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    component: KitchenSinkAppComponent,
  },
  {
    path: "register",
    component: RegisterPageComponent,
  },
  {
    path: "embedded-app",
    component: CometChatUnifiedPageComponent, canActivate: [AuGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
