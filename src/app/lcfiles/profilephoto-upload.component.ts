import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { RootObject }        from './profileread';
import { ProfileService } from './profile.service';

@Component({
  templateUrl: './profilephoto-upload.component.html'
})
export class ProfilePhotoUpload implements OnInit {
  profile: RootObject;

  constructor (
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    /*this.route.paramMap
      .switchMap((params: ParamMap) => this.profileService.getProfile(+params.get('id')))
      .subscribe(profile => this.profile = profile);*/

      //this.profileService.getProfile(3).subscribe(profile => {this.profile = profile; 
     // console.log(this.profile.profileRootObject.lcProfileId);
  //});

      //console.info("ProfileID---->", this.profile.profileRootObject.lcProfileId)
  }

  save(): void {
    /*this.heroService.update(this.hero)
      .then(() => this.goBack());*/
  }

  goBack(): void {
    this.location.back();
  }
}
