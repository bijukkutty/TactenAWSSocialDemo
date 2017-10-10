import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Country } from './country';
import { State } from './state';
import { City } from './city';
import {ProfileRootObject} from './profile';
import {CateogriesRootObject} from './CategoriesResponse';

@Injectable()
export class CreateProfileService {
// private baseUrl: string = 'https://shielded-lake-62809.herokuapp.com';
private baseUrl: string = 'http://letscreate.ap-south-1.elasticbeanstalk.com';

 catResp: CateogriesRootObject;
  constructor(private http : Http) {
  }

  getCountriesAll(): Observable<Country[]> {
    let country$ = this.http
      .get(`${this.baseUrl}/lcCountries`, {headers: this.getHeaders()})
      .map(mapCountries).catch(handleError);
    return country$;
  }
    
  getStatesForCountry(url:string): Observable<State[]> {
    let state$ = this.http
      .get(url, {headers: this.getHeaders()})
      .map(mapStates).catch(handleError);
    return state$;
  }

  getCitiesForState(url:string): Observable<City[]> {
    let city$ = this.http
      .get(url, {headers: this.getHeaders()})
      .map(mapCities).catch(handleError);
    return city$;
  }

  getCatAndSubCat(): Observable<CateogriesRootObject> {
    
    let cat$ = this.http
      .get(`${this.baseUrl}/findCatAndSubCat`, {headers: this.getHeaders()})
      .map((catResp: Response) => catResp.json()).catch(handleError);
    return cat$;
  }

    private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
    addProfile(profile: ProfileRootObject) {                
        let body = JSON.stringify(profile);            
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log(body);
        return this.http.post(`${this.baseUrl}/saveprofile`, body, options)
            .map(this.extractData)
            .catch(handleError);
    }

    private extractData(res: Response) {
        let body = res.text();
        //console.log("Result Proilfle ID---->", body.toString());
        return body.toString() || "";
    }

}

function handleError (error: any) {
  // log error
  // could be something more sofisticated 
  let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`;
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}

function mapCountries(response:Response): Country[] {
   // The response of the API has a results
   // property with the actual results
   return response.json()._embedded.lcCountries.map(toCountry);
   
}

function toCountry(r:any): Country {
  var n = r._links.self.href.lastIndexOf('/');
  var countryId = r._links.self.href.substring(n + 1);
  let country = <Country>({
    lcCountryId: countryId,
    lcCountryName: r.lcCountryName,
    lcStateSelf: r._links.self.href
  });
  console.log('Parsed Country:', country);
  return country;
}

function mapStates(response:Response): State[] {
   // The response of the API has a results
   // property with the actual results
   return response.json()._embedded.lcStates.map(toState);
   
}

function toState(r:any): State {
  var n = r._links.self.href.lastIndexOf('/');
  var stateId = r._links.self.href.substring(n + 1);
  let state = <State>({
    lcStateId: stateId,
    lcStateName: r.lcStateName,
    lcCitySelf: r._links.self.href
  });
  console.log('Parsed Country:', state);
  return state;
}

function mapCities(response:Response): City[] {
   // The response of the API has a results
   // property with the actual results
   return response.json()._embedded.lcCities.map(toCity);
   
}

function toCity(r:any): City {
  var n = r._links.self.href.lastIndexOf('/');
  var cityId = r._links.self.href.substring(n + 1);
  let city = <City>({
    lcCityId: cityId,
    lcCityName: r.lcCityName,
    lcCitySelf: r._links.self.href
  });
  console.log('Parsed City:', city);
  return city;
}


