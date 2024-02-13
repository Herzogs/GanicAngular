import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CarritoService } from '../services/carrito.service';

export const verCarroGuard: CanActivateFn = (route, state) => {
  const carrito = inject(CarritoService); 
  const rout = inject(Router); 

  return !carrito.carrito.length ?  rout.navigate(['/home']) : true;
};
