import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { MaterialModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';
import { CreateProfileService } from './createprofile-fields.service'
import { ProfileService } from './profile.service';
import { CreateProfileComponent } from './createprofile.component';
import { CreateProfileFieldsComponent } from './createprofile-fields.component';
import { ProfileLandingComponent } from './profilelanding.component';
import { MyProfileComponent } from '../secure/profile/myprofile.component';

@NgModule({
  declarations: [
    CreateProfileComponent,
    CreateProfileFieldsComponent,
    ProfileLandingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    MdSelectModule
  ],
  providers: [CreateProfileService, ProfileService]
})
export class CreateProfileModule { }
