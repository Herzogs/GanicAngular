import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IUsuarioLogin } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  
  constructor(private fb: FormBuilder,
              private Toastr: ToastrService, 
              private _usuarioService: UsuarioService,
              private router: Router) { 
    this.form = this.fb.group({
      user: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(3)]],
      pass: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    
  }

  iniciarSecion(){
    const usuario: IUsuarioLogin = {
      username: this.form.get('user')?.value,
      password: this.form.get('pass')?.value
    }
    this._usuarioService.login(usuario).subscribe({
      next: (data) => {
        this.Toastr.success(data.mensaje, 'Validacion correcta');
        setTimeout(() => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', usuario.username);
          this.router.navigate(['/home']);
        }, 3000);
      },
      error: (error) => {
        this.Toastr.error('Usuario o contraseña incorrectos', 'Error');
      },
      complete: () => {
        console.log('Finalizado');
      }
    })
    this.form.reset();
  }
}
