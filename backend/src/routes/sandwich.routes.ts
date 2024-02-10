/* eslint-disable @typescript-eslint/no-misused-promises */
import Router from 'express'
import { check } from 'express-validator'
import { obtenerSandwitch, agregarSandwitch, obtenerSandwichPorId, obtenerListadoSandwichPorClasificacion } from '../controllers/sandwich'
import validarToken from './validarToken'
import { upload } from '../helpers/salvarImages'

const router = Router()

router.get('/listarSandwitch', validarToken, obtenerSandwitch)

router.get('/obtenerSandwitch', validarToken, [
  check('id')
    .notEmpty()
    .isNumeric()
    .trim()
    .escape()
    .withMessage('El id debe ser numerico')
], obtenerSandwichPorId)

router.post('/crearSandwitch', upload.single('imagen'), [
  check('nombre')
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .isLength({ max: 30 })
    .isLength({ min: 3 })
    .withMessage('El nombre debe tener al menos 3 caracteres y maximo 10'),
  check('precio')
    .notEmpty()
    .isNumeric()
    .trim()
    .escape()
    .withMessage('El precio debe ser numerico'),
  check('descripcion')
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .isLength({ max: 100 })
    .withMessage('La descripcion debe tener al menos 100 caracteres'),
  check('clasificacion')
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .isLength({ max: 40 })
    .withMessage('La clasificacion debe tener al menos 40 caracteres')
], agregarSandwitch)

router.post('/obtenerSandwitchPorClasificacion', validarToken, [
  check('clasificacion')
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .isLength({ max: 40 })
    .withMessage('La clasificacion debe tener al menos 10 caracteres')
], obtenerListadoSandwichPorClasificacion)

export default router
