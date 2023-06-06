import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FaFactura } from '../interfaces/fafactura';

@Injectable({
  providedIn: 'root'
})
export class FaFacturaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    // this.myAppUrl = environment.endpoint;
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/FaFacturas/';
  }


  getFaFactura(id: number): Observable<FaFactura> {
    return this.http.get<FaFactura>(this.myAppUrl + this.myApiUrl + id)
  }

  generateFaFactura(id: number): Observable<FaFactura> {
    return this.http.get<FaFactura>(this.myAppUrl + this.myApiUrl + 'generar/' + id)
  }

  getListFaFacturas(): Observable<FaFactura[]> {
    return this.http.get<FaFactura[]>(this.myAppUrl + this.myApiUrl);
  }

//   deleteFaFactura(id: number): Observable<void> {
//     return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id)
//   }

  saveFaFactura(FaFactura: FaFactura): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, FaFactura)
  }

  updateFaFactura(id: number, FaFactura: FaFactura): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, FaFactura)
  }

}
