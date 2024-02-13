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
import { verCarroGuard } from './guards/ver-carro.guard';
import { ingresarSandwichGuard } from './guards/ingresar-sandwich.guard';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { MisdatosComponent } from './components/misdatos/misdatos.component';



const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full"},
  { path: "home", component: HomeComponent },
  { path: "login", providers: [UsuarioService], component: LoginComponent},
  { path: "recuperar", component: RecuperarComponent },
  { path: "registrar", providers: [UsuarioService], component: RegistroComponent },
  { path: "crearpedido", canActivate: [authGuard], canDeactivate:[carroConElementosGuard], component: SeleccionSandwitchComponent },
  { path: "confirmar", canActivate: [authGuard], component: ConfirmarCompraComponent },
  { path: "carrito", canActivate: [authGuard, verCarroGuard],component: VerCarritoComponent },
  { path: "agregarsandwich", canActivate: [authGuard, ingresarSandwichGuard], component: AgregarSandwichComponent },
  { path: "comprarealizada", canActivate: [authGuard], component: CompraRealizadaComponent },
  { path: "nosotros", component: NosotrosComponent},
  { path: "contacto", component: ContactoComponent},
  { path: "misdatos", canActivate: [authGuard], component: MisdatosComponent },
  { path: "**", redirectTo: "home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
