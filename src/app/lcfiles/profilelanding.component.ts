import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { RootObject }        from './profileread';
import { ProfileService } from './profile.service';
import {Callback, CognitoUtil, LoggedInCallback} from "../service/cognito.service";

@Component({
  templateUrl: './profilelanding.component.html'
})
export class ProfileLandingComponent implements OnInit {
  profile: RootObject;
  arrInterests: Array<string> = [];
  arrContributions: Array<string> = [];
  arrPortfolios: Array<string> = []; 
  arrSocials: Array<string> = [];
  username: string;
  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private location: Location,
    public cognitoUtil: CognitoUtil
  ) {}

  ngOnInit(): void {
   this.route.paramMap
      .switchMap((params: ParamMap) => this.profileService.getProfile(+params.get('id')))
      .subscribe(profile => {this.profile = profile; 
        this.username = this.cognitoUtil.getCurrentUser().getUsername();
      console.log(this.cognitoUtil.getCurrentUser());

    for (let category1 of this.profile.profileRootObject.lcProfileInterestsXrefs) {
        this.arrInterests.push(category1.lcSubCategory.lcSubCategoryName); 
    }
    for (let category1 of this.profile.profileRootObject.lcProfileContibsXrefs) {
        this.arrContributions.push(category1.lcSubCategory.lcSubCategoryName); 
    }
    for (let port of this.profile.profileRootObject.lcPortfolios) {
      if(port.lcPortfolioValue !== null)
        this.arrPortfolios.push(port.lcPortfolioValue); 
    }
    for (let soc of this.profile.profileRootObject.lcSocials) {
      if(soc.lcSocialValue !== null)
        this.arrSocials.push(soc.lcSocialValue); 
    }
  });

  }

  save(): void {
    /*this.heroService.update(this.hero)
      .then(() => this.goBack());*/
  }

  goBack(): void {
    this.location.back();
  }
}
