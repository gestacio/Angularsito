import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    // this.myAppUrl = environment.endpoint;
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/sessionData/';
  }

  getSessionData(nstore: number): Observable<void> {
    return this.http.get<void>(this.myAppUrl + this.myApiUrl + '/' + nstore)
  }

}
