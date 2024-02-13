export interface IUsuario{
    id?: number;
    nombre: string;
    apellido: string;
    email: string;
    username: string;
    password: string;
    direccion: string;
    rol?: string;
}

export type IUsuarioLogin = Omit<IUsuario, 'nombre' | 'apellido' | 'direccion' | 'email'>;

export type IUsuarioRecuperacion = Omit<IUsuario, 'id' | 'nombre' | 'apellido' | 'direccion' | 'password'>;

export type IToken = Pick<IUsuario, 'email' | 'rol'>;