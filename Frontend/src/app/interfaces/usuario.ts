export interface IUsuario{
    id?: number;
    nombre: string;
    apellido: string;
    email: string;
    username: string;
    password: string;
    direccion: string;
}

export type IUsuarioLogin = Omit<IUsuario, 'nombre' | 'apellido' | 'direccion' | 'email'>;

export type IUsuarioRecuperacion = Omit<IUsuario, 'id' | 'nombre' | 'apellido' | 'direccion' | 'password'>;

/* export interface IUsuarioLogin{
    username: string;
    password: string;
} */

export interface ITarjeta{
    id?: number;
    titular: string;
    numero: string;
    fechaExpiracion: string;
    cvv: string;
}