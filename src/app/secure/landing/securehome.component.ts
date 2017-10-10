import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UserLoginService} from "../../service/user-login.service";
import { ProfileService } from '../../lcfiles/profile.service';
import { RootObject }        from '../../lcfiles/profileread';
import {Callback, CognitoUtil, LoggedInCallback} from "../../service/cognito.service";

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './secureHome.html'
    // styleUrls: ['/assets/css/sb-admin.css']
})
export class SecureHomeComponent implements OnInit, LoggedInCallback {
    profile: RootObject;
    username:string;
    errors:string;
    constructor(public router: Router, public userService: UserLoginService,
        private profileService: ProfileService, private route: ActivatedRoute,
         public cognitoUtil: CognitoUtil) {
        this.userService.isAuthenticated(this);
        console.log("SecureHomeComponent: constructor");
    }

    ngOnInit() {

    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        }else{
            this.username = this.cognitoUtil.getCurrentUser().getUsername();
            this.profileService.getProfileByUsername(this.username)
           .subscribe(profile => {this.profile = profile; 
               console.log(this.profile);
               console.log(this.profile.profileRootObject.lcUserName);
               this.router.navigate(['./securehome/profile',this.profile.profileRootObject.lcProfileId]);
               },error => {
                this.errors = error;
                console.log(this.errors);
              },);
        }
    }
}

