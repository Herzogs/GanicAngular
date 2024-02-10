import { Request, Response } from 'express'
import * as usuarioService from '../services/usuarios'
import { generarToken, logearUsuario, recuperarContrasenia, verificarToken } from '../services/auth'
import { enviarEmail } from '../services/email'
import { validationResult } from 'express-validator'

// #region Lista de usuarios
const listarUsuarios = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const usuarios = await usuarioService.obtenerUsuarios()
    return res.status(200).json(usuarios)
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}
// #endregion

// #region Crear usuario
const crearUsuarios = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req)
  console.log(req.body)
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array())
  }
  try {
    await usuarioService.agregarUsuario(req.body)
    const token = generarToken(req.body.email)
    await enviarEmail({
      email: req.body.email,
      subject: 'Token de Verificación',
      html: `<b>Buenos días haga click en el link para verificar su cuenta</b>
      <br>
      <a href="http://localhost:3000/api/usuarios/verificarToken/${token}">Click aqui para verificar su cuenta</a>
      `
    })
    return res.status(201).json('Usuario Agregado Correctamente y se le enviara un correo electronico con un link de verificacion')
  } catch (error: any) {
    return res.status(404).json({ error: error.message })
  }
}
// #endregion

// #region Obtener usuario por username
const obtenerUsuarioPorUsername = async (req: Request, res: Response): Promise<Response> => {
  console.log('req.query.username==> ', req.query.q)
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array())
  }
  try {
    const usuario = await usuarioService.obtenerUsuarioPorUsername(req.query.q as string)
    return res.status(200).json(usuario)
  } catch (error: any) {
    return res.status(404).json({ error: error.message })
  }
}
// #endregion

// #region Obtener usuario por username y password
const logearUsuarioPorUsernameYPassword = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req)
  console.log(req.body)
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array())
  }
  try {
    const tokenGenerado = await logearUsuario(req.body.username as string, req.body.password as string)
    return res.status(200).json({
      mensaje: 'Usuario logueado correctamente',
      token: tokenGenerado
    })
  } catch (error: any) {
    return res.status(404).json({ error: error.message })
  }
}
// #endregion

// #region Obtener usuario por email
const obtenerUsuarioPorEmail = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array())
  }
  try {
    const usuario = await usuarioService.obtenerUsuarioPorEmail(req.query.email as string)
    return res.status(200).json(usuario)
  } catch (error: any) {
    return res.status(404).json({ error: error.message })
  }
}
// #endregion

// #region Recuperar contraseña
const recuperarContraseniaUsuario = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array())
  }
  try {
    const usuario = await usuarioService.obtenerUsuarioPorUsername(req.body.username as string)
    if (usuario.email !== req.body.email) {
      return res.status(400).json({ error: 'El email no coincide con el usuario' })
    }
    await recuperarContrasenia(req.body.email as string)
    return res.status(200).json({ mensaje: 'Se ha enviado un email con la nueva contraseña' })
  } catch (error: any) {
    return res.status(404).json({ error: error.message })
  }
}
// #endregion

// #region Verificar token
const verificarTokenRecibido = (req: Request, res: Response): Response => {
  console.log('TOKEN QUE PINCHO USUARIO ==> ', req.params.token)
  const tokenVerificado = verificarToken(req.params.token)
  return tokenVerificado != null ? res.json({ mensaje: 'Token Verificado' }) : res.status(401).json({ mensaje: 'Token invalido' })
}
// #endregion

export { verificarTokenRecibido, obtenerUsuarioPorEmail, listarUsuarios, crearUsuarios, logearUsuarioPorUsernameYPassword, obtenerUsuarioPorUsername, recuperarContraseniaUsuario }
