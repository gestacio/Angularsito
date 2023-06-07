import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';

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

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.myAppUrl + this.myApiUrl + id)
  }

  getListProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.myAppUrl + this.myApiUrl);
  }

  getCountProducts(): Observable<void> {
    return this.http.get<void>(this.myAppUrl + this.myApiUrl + "/count")
  }

  // postListProductsWhere(name: String): Observable<Product[]> {
  //   return this.http.post<Product[]>(this.myAppUrl + this.myApiUrl + "sell/", name)
  // }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id)
  }

  saveProduct(product: Product): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, product)
  }

  

  updateProduct(id: number, product: Product): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, product)
  }

  sellProducto(id: number, product: Product): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + "sell/" + id, product)
  }
}
