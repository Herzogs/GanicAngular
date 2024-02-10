import { Component } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor( private _usuarioService: UsuarioService,
               private _carritoService: CarritoService 
             ) { }


  isLogged(): boolean {
    return this._usuarioService.isLogged();
  }

  salir(): void {
    this._usuarioService.desloguear();
  }

  obtenerCantidadProductos(): number {
    return this._carritoService.carrito.length;
  }

}
