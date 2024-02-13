import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IProducto } from 'src/app/interfaces/productos';
import { CarritoService } from 'src/app/services/carrito.service';

import { SandwitchService } from 'src/app/services/sandwitch.service';

@Component({
  selector: 'app-seleccion-sandwitch',
  templateUrl: './seleccion-sandwitch.component.html',
  styleUrls: ['./seleccion-sandwitch.component.css']
})
export class SeleccionSandwitchComponent implements OnInit{
  isSubmitted = false;
  form: FormGroup;
  Preferencias: string[] = ['Clásico', 'Vegetariano', 'Vegano', 'Especial'];
  listaSandwitches: IProducto[] = [];

  constructor( 
               private formBuilder: FormBuilder,
               private _sandwitchService: SandwitchService,
               private _carritoService: CarritoService,
               private Toast: ToastrService,
               private router: Router
             ) {        
    this.form = this.formBuilder.group({
      preferencia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this._sandwitchService.getSandwitches().subscribe({
      next: (v) => this.listaSandwitches = v,
      error: (e: HttpErrorResponse) => {
        this.Toast.error(e.error.error as string);
      },
    });
  }

  actualizarPreferencia(): void{
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }
    this._sandwitchService.getSandwitchesPreferencia(this.form.get('preferencia')?.value).subscribe({
      next: (v) => this.listaSandwitches = v,
      error: (e: HttpErrorResponse) => {
        this.Toast.error(e.error.mensaje as string);
      }
    });
  }

  hayProductosEnCarrito(): boolean{
    return this._carritoService.carrito.length > 0
  }

  obtenerLongitudCarrito(): number{
    return this._carritoService.carrito.length;
  }
}