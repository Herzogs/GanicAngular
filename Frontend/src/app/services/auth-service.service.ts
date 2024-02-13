import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, of } from 'rxjs';
import { IToken } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getAuthToken(): Observable<boolean>{
    return localStorage.getItem('token') ? of(true) : of(false);
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token') as string;
    const decodedToken = jwtDecode(token) as IToken;
    return decodedToken.rol === 'Cliente';
  }

  deslogar(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }
}
