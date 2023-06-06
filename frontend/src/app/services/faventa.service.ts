import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FaVenta } from '../interfaces/faventa';

@Injectable({
  providedIn: 'root'
})
export class FaVentaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    // this.myAppUrl = environment.endpoint;
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/FaVentas/';
  }


  getFaVenta(id: string): Observable<FaVenta> {
    return this.http.get<FaVenta>(this.myAppUrl + this.myApiUrl + id)
  }

  getListFaVentas(): Observable<FaVenta[]> {
    return this.http.get<FaVenta[]>(this.myAppUrl + this.myApiUrl);
  }

//   deleteFaVenta(id: number): Observable<void> {
//     return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id)
//   }

  saveFaVenta(FaVenta: FaVenta): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, FaVenta)
  }

  updateFaVenta(id: number, FaVenta: FaVenta): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, FaVenta)
  }

}
