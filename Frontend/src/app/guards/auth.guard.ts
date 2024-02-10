import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if(token == undefined){
    console.log("Usuario no autenticado. Redirigiendo a /login");
    router.navigate(["/login"]);
    return false;
  }
  return true;
};