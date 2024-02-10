import { IUsuario, IUsuarioInput } from '../interfaces/IUsuario'
import UsuarioModel from '../models/usuarios.model'
import bcrypt from 'bcrypt'

const obtenerUsuarios = async (): Promise<IUsuario[]> => {
  return await UsuarioModel.sync()
    .then(async () => {
      return await UsuarioModel.findAll({})
    }).then((usuarios) => {
      return usuarios.map((el) => el.get({ plain: true }))
    }).catch((error) => {
      console.log(error)
      throw error
    })
}

const obtenerUsuarioPorEmail = async (email: string): Promise<IUsuario> => {
  const usuario = await UsuarioModel.findOne({ where: { email } })
  if (usuario === null) {
    throw new Error('El usuario no fue encontrado')
  }
  return usuario.get({ plain: true })
}

const agregarUsuario = async (usuario: IUsuarioInput): Promise<IUsuario> => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(usuario.password, salt)
  usuario.password = hash
  return await UsuarioModel.create(usuario).then((usuario) => {
    return usuario.get({ plain: true })
  }).catch((error) => {
    console.log(error)
    throw error
  })
}

const obtenerUsuarioPorId = async (id: number): Promise<IUsuario> => {
  const usuario = await UsuarioModel.findByPk(id)
  if (usuario === null) {
    throw new Error('El usuario no fue encontrado')
  }
  return usuario.get({ plain: true })
}

const obtenerUsuarioPorUsername = async (user: string): Promise<IUsuario> => {
  console.log('user', user)
  return await UsuarioModel.findOne({ where: { username: user } }).then((usuario) => {
    if (usuario === null) {
      throw new Error('El usuario no fue encontrado')
    }
    return usuario.get({ plain: true })
  }, (error) => {
    console.log(error)
    throw error
  })
}

export { obtenerUsuarioPorEmail, obtenerUsuarios, agregarUsuario, obtenerUsuarioPorId, obtenerUsuarioPorUsername }
