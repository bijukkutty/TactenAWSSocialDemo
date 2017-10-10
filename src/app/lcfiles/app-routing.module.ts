 import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateProfileComponent }   from './createprofile.component';
import { CreateProfileFieldsComponent }      from './createprofile-fields.component';
import { ProfileLandingComponent } from './profilelanding.component';
//import { HeroDetailComponent }  from './hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/createprofile', pathMatch: 'full' },
  { path: 'createprofile',  component: CreateProfileComponent },
  { path: 'profileFields', component: CreateProfileFieldsComponent },
  { path: 'profile/:id', component: ProfileLandingComponent }
  //{ path: 'heroes',     component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
 