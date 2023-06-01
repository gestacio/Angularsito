import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaTienda } from '../interfaces/matienda';

@Injectable({
  providedIn: 'root'
})
export class MaTiendaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    // this.myAppUrl = environment.endpoint;
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/matiendas/';
  }

  getMaTienda(nstore: number): Observable<MaTienda[]> {
    return this.http.get<MaTienda[]>(this.myAppUrl + this.myApiUrl + "?nstore=" + nstore)
  }

  getListMaTiendas(): Observable<MaTienda[]> {
    return this.http.get<MaTienda[]>(this.myAppUrl + this.myApiUrl);
  }

  saveMaTienda(matienda: MaTienda): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, matienda)
  }

  updateMaTienda(id: number, matienda: MaTienda): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, matienda)
  }

}
