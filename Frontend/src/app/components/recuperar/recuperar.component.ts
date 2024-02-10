import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUsuarioRecuperacion } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent {
  form: FormGroup;

  constructor(
            private fb: FormBuilder,
            private Toastr: ToastrService, 
            private _usuarioService: UsuarioService,
            private router: Router
  ) { 
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      user: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    
  }

  recuperarContrasenia(){
    const usuario: IUsuarioRecuperacion = {
      email: this.form.get('email')?.value,
      username: this.form.get('user')?.value
    }
    console.log(usuario);
    this._usuarioService.recuperarContrasenia(usuario).subscribe({
      next: (data: string) => {
        this.Toastr.success(data, 'Validacion correcta');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        console.log(error);
        this.Toastr.error('Error al procesar su solicitud', 'Error');
      },
      complete: () => {
        console.log('Finalizado');
      }
    })
    this.form.reset();
  }
}
