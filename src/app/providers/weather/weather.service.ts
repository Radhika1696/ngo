import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = '3846169fbe28c1f5498aa431a3cb010e'; // Please generate your own api key here --> https://openweathermap.org
  url: string;
  queryNotFound: string;

  constructor(public http: HttpClient) {
    this.url = 'https://api.openweathermap.org/data/2.5/weather?q=';
  }

  getWeather(state, city): Observable<any> {
    return this.http.get(this.url + city + ',' + state + '&appid=' + this.apiKey).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  // Private
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
