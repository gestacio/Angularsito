import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaCliente } from '../interfaces/macliente';

@Injectable({
  providedIn: 'root'
})
export class MaClienteService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    // this.myAppUrl = environment.endpoint;
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/maclientes/';
  }


  getMaCliente(xdni: string): Observable<MaCliente> {
    return this.http.get<MaCliente>(this.myAppUrl + this.myApiUrl + xdni)
  }

  getListMaClientes(): Observable<MaCliente[]> {
    return this.http.get<MaCliente[]>(this.myAppUrl + this.myApiUrl);
  }

  deleteMaCliente(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id)
  }

  saveMaCliente(macliente: MaCliente): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, macliente)
  }

  updateMaCliente(id: number, macliente: MaCliente): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, macliente)
  }

  sellMaClienteo(id: number, macliente: MaCliente): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + "sell/" + id, macliente)
  }
}
