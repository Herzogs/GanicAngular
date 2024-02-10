import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SeleccionSandwitchComponent } from './components/seleccion-sandwitch/seleccion-sandwitch.component';
import { UsuarioService } from './services/usuario.service';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ConfirmarCompraComponent } from './components/confirmar-compra/confirmar-compra.component';
import { carroConElementosGuard } from './guards/carro-con-elementos.guard';
import { VerCarritoComponent } from './components/ver-carrito/ver-carrito.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { AgregarSandwichComponent } from './components/agregar-sandwich/agregar-sandwich.component';
import { CompraRealizadaComponent } from './components/compra-realizada/compra-realizada.component';


const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full"},
  { path: "home", component: HomeComponent },
  { path: "login", providers: [UsuarioService], component: LoginComponent},
  { path: "recuperar", component: RecuperarComponent },
  { path: "registrar", providers: [UsuarioService], component: RegistroComponent },
  { path: "crearPedido", canActivate: [authGuard], canDeactivate: [carroConElementosGuard], component: SeleccionSandwitchComponent },
  { path: "confirmar", canActivate: [authGuard], component: ConfirmarCompraComponent },
  { path: "carrito", canActivate: [authGuard],component: VerCarritoComponent },
  { path: "agregarSandwich", component: AgregarSandwichComponent },
  { path: "compraRealizada", canActivate: [authGuard], component: CompraRealizadaComponent },
  { path: "**", redirectTo: "home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
