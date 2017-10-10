import 'rxjs/add/operator/switchMap';

import { Component, Input, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Country } from './country';
import { State } from './state';
import { City } from './city';
import { ProfileRootObject } from './profile';
import { LcCountry } from './profile';
import { LcState } from './profile';
import { LcCity } from './profile';
import { LcPortfolio } from './profile';
import { LcSocial } from './profile';
import { LcProfileContibsXref } from './profile';
import { LcProfileInterestsXref } from './profile';
import { LcSubCategory } from './profile';
import { CateogriesRootObject } from './CategoriesResponse';
import { CategoriesResponse } from './CategoriesResponse';
import { CreateProfileService } from './createprofile-fields.service';
import {Callback, CognitoUtil, LoggedInCallback} from "../service/cognito.service";
import { Router } from '@angular/router';
import 'rxjs/add/operator/first'
declare var $: any;

@Component({
  templateUrl: './createprofile-fields.component.html'
})
export class CreateProfileFieldsComponent {
  selectedCountryDD: Country;
  selectedStateDD: State;
  selectedCityDD: City;
  arrPortSocOptions: Array<string> = ['Please Select','Youtube','Instagram','LinkedIn'];
  lccountry: LcCountry = new LcCountry();
  lcstate: LcState = new LcState();
  lccity: LcCity = new LcCity();
  arrlcportfolio: Array<LcPortfolio> = new Array<LcPortfolio>();
  arrlcsocial: Array<LcSocial> = new Array<LcSocial>();
  lcSubCategory: LcSubCategory;
  lcSubCategory1: LcSubCategory;
  lcProfileContibsXref: LcProfileContibsXref;
  arrlcProfileContibsXref: Array<LcProfileContibsXref> = new Array<LcProfileContibsXref>();
  lcProfileInterestsXref: LcProfileInterestsXref;
  arrlcProfileInterestsXref: Array<LcProfileInterestsXref> = new Array<LcProfileInterestsXref>();
  profileRootObject: ProfileRootObject = new ProfileRootObject();
  arrCategResp: CateogriesRootObject = new CateogriesRootObject();
  resultCountries: Array<Country>;
  resultStates: Array<State>;
  resultCities: Array<City>;
  addProfileResponse: String;
  arrCategoriesResponse: Array<CategoriesResponse>;
  arrCategoriesInterestResponse: Array<CategoriesResponse>;
  constructor(private _profileService: CreateProfileService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    public cognitoUtil: CognitoUtil
  ) {}

  ngOnInit(): void {
    this.profileRootObject.lcCountry=this.lccountry;
    this.profileRootObject.lcState=this.lcstate;
    this.profileRootObject.lcCity=this.lccity;
    this.arrlcportfolio = [new LcPortfolio(), new LcPortfolio()];
    this.arrlcsocial = [new LcSocial(), new LcSocial()];
    this.profileRootObject.lcPortfolios=this.arrlcportfolio;
    this.profileRootObject.lcSocials=this.arrlcsocial;
    this.profileRootObject.lcProfileContibsXrefs=this.arrlcProfileContibsXref;
    this.profileRootObject.lcProfileInterestsXrefs=this.arrlcProfileInterestsXref;
    this._profileService.getCountriesAll().subscribe
    (resultCountries => {this.resultCountries = resultCountries;
      this.resultCountries.splice(0,0,
        {lcCountryName: 'Select Country', lcCountryId: 0, lcStateSelf: ''});
        this.selectedCountryDD = this.resultCountries[0];
    });
    this._profileService.getCatAndSubCat().subscribe
      (arrCategoriesResponse => {this.arrCategoriesResponse = 
        arrCategoriesResponse.categoriesResponse;
        // Deep copy
          this.arrCategResp = $.extend(true, {}, arrCategoriesResponse);
          this.arrCategoriesInterestResponse = this.arrCategResp.categoriesResponse;
      });
  }
	public processCountrySelection(e: any): void {
    this.profileRootObject.lcCountry.lcCountryId=e.lcCountryId; 
    console.log(`Selected value: ` + e.lcCountryName);
    this.selectedCountryDD = e;
		this._profileService.getStatesForCountry(e.lcStateSelf+`/lcStates`).
      subscribe(resultStates => {this.resultStates = resultStates;
        this.resultStates.splice(0,0,
        {lcStateName: 'Select State', lcStateId: 0, lcCitySelf: ''});
        this.selectedStateDD = this.resultStates[0];
        while(this.resultCities.length > 1) {
            this.resultCities.pop();
        }
        this.selectedCityDD = this.resultCities[0];
    });
  }
    
	public processStateSelection(e: any): void {
    this.profileRootObject.lcState.lcStateId=e.lcStateId; 
		console.log(`Selected value: ` + e.lcStateName);
		this._profileService.getCitiesForState(e.lcCitySelf+`/lcCities`).
      subscribe(resultCities => {this.resultCities = resultCities;
       this.resultCities.splice(0,0,
        {lcCityName: 'Select City', lcCityId: 0, lcCitySelf: ''});
        this.selectedCityDD = this.resultCities[0];
      });
  }

	public processCitySelection(e: any): void {
    this.profileRootObject.lcCity.lcCityId=e.lcCityId; 
		console.log(`Selected City value: ` + e.lcCityName);
  }
 
/*   public saveProfile(): void {
    console.log(this.arrCategoriesResponse);
    for (let category of this.arrCategoriesResponse) {
      for (let subcat of category.lcSubCategories) {
         if(subcat.hasOwnProperty('checked') &&
                  subcat.checked == true){
           //to persist contributions selections
            this.lcProfileContibsXref = new LcProfileContibsXref();
            this.lcSubCategory = new LcSubCategory();
            this.lcSubCategory.lcSubCategoryId = subcat.lcSubCategoryId;
            this.lcProfileContibsXref.lcSubCategory = this.lcSubCategory;
            this.arrlcProfileContibsXref.push(this.lcProfileContibsXref);
        } 
      } 
    }
    for (let category1 of this.arrCategoriesInterestResponse) {
      for (let subcat1 of category1.lcSubCategories) {
         if(subcat1.hasOwnProperty('checked') &&
                  subcat1.checked == true){
            //to persist social selections
            this.lcProfileInterestsXref = new LcProfileInterestsXref();
            this.lcSubCategory1 = new LcSubCategory();
            this.lcSubCategory1.lcSubCategoryId = subcat1.lcSubCategoryId;
            this.lcProfileInterestsXref.lcSubCategory = this.lcSubCategory1;
            this.arrlcProfileInterestsXref.push(this.lcProfileInterestsXref);
        } 
      } 
    }
    console.log (this.profileRootObject );
    this.profileRootObject.lcUserName = this.cognitoUtil.getCurrentUser().getUsername();
		 this._profileService.addProfile(this.profileRootObject).
			subscribe(addProfileResponse => {this.addProfileResponse = addProfileResponse;;
      console.log ("Split string--->",this.addProfileResponse.split(":",2)[1]);}); 
  } 
 */
  public addMorePortfolio(){
    this.arrlcportfolio.push(new LcPortfolio(), new LcPortfolio());
  }

  public addMoreSocial(){
    this.arrlcsocial.push(new LcSocial(), new LcSocial());
  }

  public goToProfileLanding(): void {

   console.log(this.arrCategoriesResponse);
    for (let category of this.arrCategoriesResponse) {
      for (let subcat of category.lcSubCategories) {
         if(subcat.hasOwnProperty('checked') &&
                  subcat.checked == true){
           //to persist contributions selections
            this.lcProfileContibsXref = new LcProfileContibsXref();
            this.lcSubCategory = new LcSubCategory();
            this.lcSubCategory.lcSubCategoryId = subcat.lcSubCategoryId;
            this.lcProfileContibsXref.lcSubCategory = this.lcSubCategory;
            this.arrlcProfileContibsXref.push(this.lcProfileContibsXref);
        } 
      } 
    }
    for (let category1 of this.arrCategoriesInterestResponse) {
      for (let subcat1 of category1.lcSubCategories) {
         if(subcat1.hasOwnProperty('checked') &&
                  subcat1.checked == true){
            //to persist social selections
            this.lcProfileInterestsXref = new LcProfileInterestsXref();
            this.lcSubCategory1 = new LcSubCategory();
            this.lcSubCategory1.lcSubCategoryId = subcat1.lcSubCategoryId;
            this.lcProfileInterestsXref.lcSubCategory = this.lcSubCategory1;
            this.arrlcProfileInterestsXref.push(this.lcProfileInterestsXref);
        } 
      } 
    }
    console.log (this.profileRootObject );
    this.profileRootObject.lcUserName = this.cognitoUtil.getCurrentUser().getUsername();
		 this._profileService.addProfile(this.profileRootObject).
			subscribe(addProfileResponse => {this.addProfileResponse = addProfileResponse;
        this.router.navigate(['./securehome/profile',this.addProfileResponse.split(":",2)[1]])});
      console.log (this.addProfileResponse); 

       
  }
}
