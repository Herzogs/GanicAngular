import { Component } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.css']
})
export class MisdatosComponent {

  usuario: IUsuario = {} as IUsuario;

  constructor(
    private usuarioService: UsuarioService
  ) { 
  }
  
  ngOnInit(): void {
    this.usuarioService.obtenerUsuario(localStorage.getItem('user') as string).subscribe({
       next: (data: IUsuario) => {
         this.usuario = data;
       },
       error: (error) => {
         console.log(error);
       },
       complete: () => {
         console.log('Finalizado');
       }
     })
  }
}
