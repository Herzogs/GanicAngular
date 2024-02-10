import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProducto } from 'src/app/interfaces/productos';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-ver-carrito',
  templateUrl: './ver-carrito.component.html',
  styleUrls: ['./ver-carrito.component.css']
})
export class VerCarritoComponent {

  listaCarrito: IProducto[];

  constructor(
              private _carritoService: CarritoService,
              private _router: Router,
              private Toast: ToastrService,
              private cdr: ChangeDetectorRef
  ) { 
    this.listaCarrito = [];
  }
  
  ngOnInit(): void {
    
    this.listaCarrito = this._carritoService.carrito;
  }

  obtenerTotal() {
    return this._carritoService.obtenerMonto();
  }

  vaciarCarro(){
    this._carritoService.vaciarCarrito();
    this.Toast.success('Carrito vaciado', 'Carrito');
  }

  eliminarDelCarro(producto: IProducto) {
    this._carritoService.eliminarDelCarrito(producto);
    this.Toast.success('Producto eliminado del carrito', 'Carrito');
    this.cdr.detectChanges(); // Forzar la actualización de la vista
}
 
}
