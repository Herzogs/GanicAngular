import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProducto } from 'src/app/interfaces/productos';
import { CarritoService } from 'src/app/services/carrito.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-confirmar-compra',
  templateUrl: './confirmar-compra.component.html',
  styleUrls: ['./confirmar-compra.component.css']
})
export class ConfirmarCompraComponent {
  public init_point: string = '';
  public desabilitarBoton: boolean = false;
  public listaProductos: IProducto[] = [];

  constructor(
    private _usuarioService: UsuarioService,
    private _carritoService: CarritoService,
    private toastr: ToastrService,
  ) {
    this.listaProductos = this._carritoService.carrito;
  }

  obtenerMonto(): number {
    return this._carritoService.obtenerMonto();
  }

  vaciarCarro(): void {
    this._carritoService.vaciarCarrito();
  }
}
