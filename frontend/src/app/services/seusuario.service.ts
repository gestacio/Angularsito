import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'
// import 'rxjs/add/operator/catch';
import { SeUsuario } from '../interfaces/seusuario';
import { LoginSeUsuario } from '../interfaces/loginseusuario';

@Injectable({
  providedIn: 'root'
})
export class SeUsuarioService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    // this.myAppUrl = environment.endpoint;
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/seusuarios/';
  }

  postLoginSeUsuario(seusuario: LoginSeUsuario): Observable<SeUsuario> {
    return this.http.post<SeUsuario>(this.myAppUrl + this.myApiUrl + "login/", seusuario)
  }

  getSeUsuario(id: number): Observable<SeUsuario> {
    return this.http.get<SeUsuario>(this.myAppUrl + this.myApiUrl + id)
  }

  getListSeUsuarios(): Observable<SeUsuario[]> {
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