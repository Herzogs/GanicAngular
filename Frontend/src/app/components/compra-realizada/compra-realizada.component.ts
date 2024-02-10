import { Component } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-compra-realizada',
  templateUrl: './compra-realizada.component.html',
  styleUrls: ['./compra-realizada.component.css']
})
export class CompraRealizadaComponent {
  
  constructor(
    private _carritoService: CarritoService
  ) { 
    console.log(this._carritoService.carrito);
    this._carritoService.vaciarCarrito();
  }

}
