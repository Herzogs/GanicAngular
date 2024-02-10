export interface IUsuario {
  id: number
  email: string
  username: string
  password: string
  nombre: string
  apellido: string
  direccion: string
  habilitado: boolean
}

export type IUsuarioInput = Omit<IUsuario, 'id' | 'habilitado'>
