import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaEmpresa } from '../interfaces/maempresa';

@Injectable({
  providedIn: 'root'
})
export class MaEmpresaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    // this.myAppUrl = environment.endpoint;
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/maempresa/';
  }

  getMaEmpresa(): Observable<MaEmpresa> {
    return this.http.get<MaEmpresa>(this.myAppUrl + this.myApiUrl);
  }

//   updateProduct(id: number, product: Product): Observable<void> {
//     return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, product)
//   }

}
