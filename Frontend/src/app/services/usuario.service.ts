import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITarjeta, IUsuario, IUsuarioLogin, IUsuarioRecuperacion } from '../interfaces/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor( private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/usuarios/';
  }

  crearUsuario(usuario: IUsuario): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}crearUsuario`, usuario);
  }

  login(usuario: IUsuarioLogin): Observable<any> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}logear`, usuario);
  }

  obtenerMetodoPago(id: number): Observable<ITarjeta> {
    return this.http.get<ITarjeta>(`${this.myAppUrl}${this.myApiUrl}obtenerMetodoPago`, {params: {id: id.toString()}});
  }

  isLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  desloguear(): void {
    localStorage.removeItem('token');
  }

  recuperarContrasenia(usuario: IUsuarioRecuperacion): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}recuperarContrasenia`, usuario);
  }

  obtenerUsuario(username: string): Observable<IUsuario> {
    return this.http.get<IUsuario>(`${this.myAppUrl}${this.myApiUrl}obtenerUsuario`, {params: {q: username}});
  }

}
