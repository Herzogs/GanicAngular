import { Injectable } from '@angular/core';
import { IProducto } from '../interfaces/productos';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private _carrito: IProducto[];
  private myAppUrl: string;
  private myApiUrl: string;
  

  constructor(
    private http: HttpClient
  ) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/pago/';
    this._carrito = [];
  }

  public get carrito(): IProducto[] {
    return this._carrito;
  }

  public agregarAlCarrito(producto: IProducto): void {
    this._carrito.push(producto);
  }

  public eliminarDelCarrito(producto: IProducto): void {
    this._carrito = this._carrito.filter( item => item.id !== producto.id);
  }

  public obtenerMonto(): number {
    return this._carrito.reduce( (total, item) => total + item.precio, 0);
  }

  public vaciarCarrito(): void {
    this._carrito = [];
  }

  generarOrdenPago(ordenPago: any): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}crearOrden`, ordenPago);
  }

  compraExitosa(): Observable<boolean> {
    return this.http.get<boolean>(`${this.myAppUrl}${this.myApiUrl}pagoAceptado`);
  }
}
