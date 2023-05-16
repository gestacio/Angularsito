import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';
import { SeUsuario } from '../interfaces/seusuario';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    // this.myAppUrl = environment.endpoint;
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/productos/';
  }

  getListProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.myAppUrl + this.myApiUrl);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id)
  }

  saveProduct(product: Product): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, product)
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.myAppUrl + this.myApiUrl + id)
  }

  updateProduct(id: number, product: Product): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, product)
  }
}

@Injectable({
    providedIn: 'root'
  })
export class SeUsuarioService {
    private myAppUrl: string;
    private myApiUrl: string;
  
    constructor(private http: HttpClient) { 
      // this.myAppUrl = environment.endpoint;
      this.myAppUrl = 'http://localhost:3000/';
      this.myApiUrl = 'api/seusuario/';
    }

    postLoginSeUsuario(seusuario: SeUsuario): Observable<SeUsuario> {
        return this.http.post<SeUsuario>(this.myAppUrl + this.myApiUrl + "login/", seusuario)
      }
  
    getSeUsuario(id: number): Observable<SeUsuario> {
      return this.http.get<SeUsuario>(this.myAppUrl + this.myApiUrl + id)
    }

    getListSeUsuario(): Observable<SeUsuario[]> {
      return this.http.get<SeUsuario[]>(this.myAppUrl + this.myApiUrl);
    }
  
    deleteSeUsuario(id: number): Observable<void> {
      return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id)
    }
  
    saveSeUsuario(seusuario: SeUsuario): Observable<void> {
      return this.http.post<void>(this.myAppUrl + this.myApiUrl, seusuario)
    }
  
  
    updateSeUsuario(id: number, seusuario: SeUsuario): Observable<void> {
      return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, seusuario)
    }
  }