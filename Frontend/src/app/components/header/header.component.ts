import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor( private _authService: AuthService,
               private _carritoService: CarritoService 
             ) { }


  isLogged(): boolean {
    return localStorage.getItem('token') === null ? false : true;
  }

  salir(): void {
    this._authService.deslogar();
  }

  obtenerCantidadProductos(): number {
    return this._carritoService.carrito.length;
  }

  isAdmin(): boolean {
    return this._authService.isAdmin();
  }

}
