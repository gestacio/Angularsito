import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeRol } from '../interfaces/serol';

@Injectable({
  providedIn: 'root'
})
export class SeRolService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    // this.myAppUrl = environment.endpoint;
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/serol/';
  }

  getListSeRoles(): Observable<SeRol[]> {
    return this.http.get<SeRol[]>(this.myAppUrl + this.myApiUrl);
  }

  getSeRolWhere(serol: SeRol): Observable<SeRol> {
    return this.http.post<SeRol>(this.myAppUrl + this.myApiUrl + "rol", serol)
  }

  deleteSeRol(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id)
  }

  saveSeRol(product: SeRol): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, product)
  }

  getSeRol(id: number): Observable<SeRol> {
    return this.http.get<SeRol>(this.myAppUrl + this.myApiUrl + id)
  }

  updateSeRol(id: number, product: SeRol): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, product)
  }
}
