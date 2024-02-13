import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProducto } from 'src/app/interfaces/productos';
import { CarritoService } from 'src/app/services/carrito.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-vercarrito',
  templateUrl: './ver-carrito.component.html',
  styleUrls: ['./ver-carrito.component.css']
})
export class VerCarritoComponent {
  public listaCarrito: IProducto[];
  public desabilitarBoton: boolean;
  public init_point: any;

  constructor(
    private carritoService: CarritoService,
    private router: Router,
    private Toastr: ToastrService,
    private _usuarioService: UsuarioService
  ) {
    this.listaCarrito = [];
    this.desabilitarBoton = false;
  }

  ngOnInit() {
    this.listaCarrito = this.carritoService.carrito;
    this.desabilitarBoton = false;
    this.init_point = '';
  }

  obtenerMonto(): number {
    return Number(this.carritoService.obtenerMonto());
  }

  eliminarDelCarrito(producto: IProducto): void {
    this.carritoService.eliminarDelCarrito(producto);
    this.ngOnInit()
  }

  varciarCarrito(): void {
    this.carritoService.vaciarCarrito();
    this.Toastr.success('Carrito vaciado', 'Carrito vaciado');
    this.router.navigate(['/crearPedido']);
  }

  obtenerCantidadElementos(): number {
    return this.carritoService.obtenerCantidadElementos();
  }

  obtenerEstadoDeBoton(): boolean {
    return this.desabilitarBoton;
  }

  generarOrdenPago(): void {
    console.log("Generando orden de pago")
    this._usuarioService.obtenerUsuario(localStorage.getItem('user') as string).subscribe({
      next: (usuario: any) => {
        console.log("Usuario obtenido")
        this.carritoService.generarOrdenPago({
          idUsuario: usuario.id,
          monto: this.obtenerMonto(),
          productos: this.listaCarrito
        }).subscribe({
          next: (response: any) => {
            console.log(response)
            console.log(response.data)
            console.log("Orden de pago generada")
            this.desabilitarBoton = true;
            this.Toastr.success('Orden de pago generada exitosamente', 'Orden de pago');
            this.init_point = response.init_point;
            console.log(this.init_point + ' es el point')
            
          },
          error: (error: any) => {
            console.log(error);
            this.Toastr.error('Error al generar orden de pago', 'Orden de pago');
          }
        })
      },
      error: (error: any) => {
        console.log(error);
        this.Toastr.error('Error al obtener usuario', 'Orden de pago');
      }
    })
  }
}