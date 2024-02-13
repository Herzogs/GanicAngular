import { IUsuario } from '../interfaces/IUsuario'
import { ITokenPayload } from '../interfaces/ITokenPayload'
import UsuarioModel from '../models/usuarios.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { enviarEmail } from './email'

// #region Login de usuario
const logearUsuario = async (user: string, pass: string): Promise<string> => {
  let usuarioEncontrado: IUsuario
  return await UsuarioModel.findOne({ where: { username: user } })
    .then(async (usuario) => {
      if (usuario == null) {
        throw new Error('El usuario no fue encontrado')
      }
      usuarioEncontrado = usuario.get({ plain: true })
      if (!(usuarioEncontrado.habilitado)) {
        throw new Error('Usuario no habilitado')
      }
      return await bcrypt.compare(pass, usuarioEncontrado.password)
    })
    .then((passwordMatch) => {
      if (!passwordMatch) {
        throw new Error('Contraseña incorrecta')
      }
      const token = jwt.sign({
        rol: usuarioEncontrado.rol
      }, process.env.JWT_SECRET as string)
      return token
    })
    .catch((error) => {
      throw error
    })
}
// #endregion

// #region Recuperar contraseña
const recuperarContrasenia = async (email: string): Promise<void> => {
  console.log('Enviando email a ' + email)
  const nuevaContrasenia = generarContraseniaNueva()
  console.log('La nueva contraseña es ' + nuevaContrasenia)
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(nuevaContrasenia, salt)
  const attr = {
    email,
    subject: 'Restablecer contraseña',
    html: `<b>Buenos días aqui se le envia la nueva contraseña ${nuevaContrasenia}</b>`
  }
  await enviarEmail(attr)
  await UsuarioModel.update({ password: hash }, { where: { email } })
}
// #endregion

// #region Generar contraseña nueva
const randomChar = (allowedChars: string): string => {
  return allowedChars[Math.floor(Math.random() * allowedChars.length)]
}

const generarContraseniaNueva = (passwordLen = 12, hasUpperCase = true, hasLowerCase = true, hasNumbers = true): string => {
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'

  let allowedChars: string = ''

  let password: string = ''

  if (hasUpperCase) {
    allowedChars = uppercaseLetters
    password += randomChar(allowedChars)
  }

  if (hasLowerCase) {
    allowedChars = lowercaseLetters
    password += randomChar(lowercaseLetters)
  }

  if (hasNumbers) {
    allowedChars = numbers
    password += randomChar(numbers)
  }

  for (let i = password.length; i < passwordLen; i++) {
    password += randomChar(allowedChars)
  }
  return password
}
// #endregion

// #region Generar token
const generarToken = (email: string): string => {
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: email
  }, process.env.JWT_SECRET as string)
  return token
}

// #endregion

// #region Verificar token recibido del usuario
const verificarToken = async (token: string): Promise<boolean> => {
  try {
    console.log('TOKEN RECIBIDO ==>', token)
    jwt.verify(token, process.env.JWT_SECRET as string)
    const decoded = jwt.decode(token) as ITokenPayload
    console.log('Decoded ==>', decoded)
    const data = decoded.data
    console.log('Data del payload ==>', data)
    await UsuarioModel.update({ habilitado: true }, { where: { email: data } })
    return true
  } catch (error) {
    return false
  }
}
// #endregion

export { recuperarContrasenia, logearUsuario, generarToken, verificarToken }
