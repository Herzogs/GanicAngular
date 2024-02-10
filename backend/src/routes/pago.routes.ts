/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { crearOrden } from '../controllers/pago'
import validarToken from './validarToken'
const router = Router()

router.post('/crearOrden', validarToken, crearOrden)

router.get('/pagoAceptado', (_req, res) => {
  res.send('Hello world')
})

router.get('/pagoRechazado', (_req, res) => {
  res.send('Hello world')
})

router.get('/pagoPendiente', (_req, res) => {
  res.send('Hello world')
})

router.post('/webhook', (_req, res) => {
  res.send('Hello world')
})

export default router
