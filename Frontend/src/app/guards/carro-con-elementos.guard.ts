import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { CarritoService } from '../services/carrito.service';

export const carroConElementosGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  const carrito = inject(CarritoService);
  if(nextState.url === '/confirmar' && carrito.carrito.length == 0){
    console.log("Carrito vacío. No redirigiendo a /confirmar");
    return false;
  }
  console.log("Carrito con elementos. Redirigiendo");
  return true;
};
