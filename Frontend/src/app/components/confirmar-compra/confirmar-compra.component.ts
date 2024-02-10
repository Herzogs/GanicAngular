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

  generarOrdenPago(): void {
    console.log("Generando orden de pago")
    this._usuarioService.obtenerUsuario(localStorage.getItem('user') as string).subscribe({
      next: (usuario: any) => {
        console.log("Usuario obtenido")
        this._carritoService.generarOrdenPago({
          idUsuario: usuario.id,
          monto: this.obtenerMonto(),
          productos: this.listaProductos
        }).subscribe({
          next: (response: any) => {
            console.log(response)
            console.log(response.data)
            console.log("Orden de pago generada")
            this.desabilitarBoton = true;
            this.toastr.success('Orden de pago generada exitosamente', 'Orden de pago');
            this.init_point = response.init_point;
            console.log(this.init_point + ' es el point')
            
          },
          error: (error: any) => {
            console.log(error);
            this.toastr.error('Error al generar orden de pago', 'Orden de pago');
          }
        })
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error('Error al obtener usuario', 'Orden de pago');
      }
    })
  }
}
