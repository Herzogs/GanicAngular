import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Modulos
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';

// Interceptors
import { AgregarTokenInterceptor } from './utils/agregar-token.interceptor';

// Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { SeleccionSandwitchComponent } from './components/seleccion-sandwitch/seleccion-sandwitch.component';
import { SandwitchComponent } from './components/seleccion-sandwitch/sandwitch/sandwitch.component';
import { SliderComponent } from './components/slider/slider.component';
import { ConfirmarCompraComponent } from './components/confirmar-compra/confirmar-compra.component';
import { VerCarritoComponent } from './components/ver-carrito/ver-carrito.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { AgregarSandwichComponent } from './components/agregar-sandwich/agregar-sandwich.component';
import { CompraRealizadaComponent } from './components/compra-realizada/compra-realizada.component';
import { MisdatosComponent } from './components/misdatos/misdatos.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    SeleccionSandwitchComponent,
    SandwitchComponent,
    SliderComponent,
    ConfirmarCompraComponent,
    VerCarritoComponent,
    RecuperarComponent,
    AgregarSandwichComponent,
    CompraRealizadaComponent,
    MisdatosComponent,
    ContactoComponent,
    NosotrosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AgregarTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
