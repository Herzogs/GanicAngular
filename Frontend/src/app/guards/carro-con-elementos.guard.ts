import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { ToastrService } from 'ngx-toastr';

export const carroConElementosGuard: CanDeactivateFn<unknown> = (_component, _currentRoute, _currentState, nextState) => {
  const carrito = inject(CarritoService);
  const toastr = inject(ToastrService);
  if(nextState.url === '/confirmar' && carrito.carrito.length == 0){
    toastr.error('No puede confirmar un carrito vacío', 'Error');
    return false;
  }
  return true;
};
