import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileService } from './profile.service';
import {Callback, CognitoUtil, LoggedInCallback} from "../service/cognito.service";

@Component({
  templateUrl: './createprofile.component.html',
  styleUrls: ['./createprofile.component.css']
})

 export class CreateProfileComponent implements OnInit {
  title = 'Tour of Heroes';
  username: string;
 // selectedProfile : RootObject;

constructor(
    private profileService: ProfileService,
    private router: Router, public cognitoUtil: CognitoUtil) { }
	
  ngOnInit(): void {
   this.username = this.cognitoUtil.getCurrentUser().getUsername();
  }

public redirectToProfileCreation(): void {
	this.router.navigate(['./securehome/profileFields']);
}
}
