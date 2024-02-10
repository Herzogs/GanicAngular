/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { listarUsuarios, crearUsuarios, logearUsuarioPorUsernameYPassword, obtenerUsuarioPorUsername, recuperarContraseniaUsuario, verificarTokenRecibido } from '../controllers/usuarios'
import { query, body } from 'express-validator'
const routes = Router()

routes.get('/listarUsuarios', listarUsuarios)
routes.post('/crearUsuario',
  [
    body('username')
      .notEmpty()
      .isString()
      .trim()
      .escape()
      .isLength({ max: 10 })
      .isLength({ min: 3 })
      .withMessage('El username debe tener al menos 3 caracteres y maximo 10'),
    body('password')
      .notEmpty()
      .isString()
      .trim()
      .escape()
      .isLength({ max: 12 })
      .isLength({ min: 3 })
      .withMessage('El password debe tener al menos 3 caracteres y maximo 10'),
    body('email')
      .notEmpty()
      .isString()
      .trim()
      .escape()
      .isEmail()
      .withMessage('El email debe ser valido'),
    body('nombre')
      .notEmpty()
      .isString()
      .trim()
      .escape()
      .isLength({ max: 10 })
      .isLength({ min: 3 })
      .withMessage('El nombre debe tener al menos 3 caracteres y maximo 10'),
    body('apellido')
      .notEmpty()
      .isString()
      .trim()
      .escape()
      .isLength({ max: 10 })
      .isLength({ min: 3 })
      .withMessage('El apellido debe tener al menos 3 caracteres y maximo 10'),
    body('direccion')
      .notEmpty()
      .isString()
      .trim()
      .escape()
      .isLength({ max: 30 })
      .isLength({ min: 3 })
      .withMessage('La dirección debe tener al menos 3 caracteres y maximo 30')
  ], crearUsuarios)
routes.get('/obtenerUsuario',
  [
    query('q')
      .notEmpty()
      .isString()
      .trim()
      .escape()
      .isLength({ max: 50 })
      .isLength({ min: 3 })
      .withMessage('El username debe tener al menos 3 caracteres y maximo 50')
  ], obtenerUsuarioPorUsername)
routes.post('/logear',
  [
    body('username')
      .notEmpty()
      .isString()
      .trim()
      .escape()
      .isLength({ max: 10 })
      .isLength({ min: 3 })
      .withMessage('El username debe tener al menos 3 caracteres y maximo 10'),
    body('password')
      .notEmpty()
      .isString()
      .trim()
      .escape()
      .isLength({ max: 30 })
      .isLength({ min: 3 })
      .withMessage('El password debe tener al menos 3 caracteres y maximo 30')
  ], logearUsuarioPorUsernameYPassword)
routes.get('/obtenerUsuarioPorEmail',
  [
    query('q')
      .notEmpty()
      .isString()
      .trim()
      .escape()
      .isEmail()
      .withMessage('El email debe ser valido')
  ], obtenerUsuarioPorUsername)
routes.post('/recuperarContrasenia', [
  body('username')
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .isLength({ max: 10 })
    .isLength({ min: 3 })
    .withMessage('El username debe tener al menos 3 caracteres y maximo 10'),
  body('email')
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .isEmail()
    .withMessage('El email debe ser valido')
], recuperarContraseniaUsuario)
routes.get('/verificarToken/:token', verificarTokenRecibido)

export default routes
