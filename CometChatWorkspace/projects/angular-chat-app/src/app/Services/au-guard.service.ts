import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from '../../cometchat-pro-angular-ui-kit/CometChatWorkspace/projects/angular-chat-ui-kit/src/components/Out-Service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuGuardService implements CanActivate{

  constructor(private local: LocalStorageService,private router: Router,) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let uid = this.local.get("uid")
    if(uid) {
      return true;
    }
    //const currentUser = this.authenticationService.currentUserValue;
    // if (currentUser) {
    //     // logged in so return true
    //     return true;
    // }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
}

}
