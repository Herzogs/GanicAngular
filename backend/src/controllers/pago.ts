import { Request, Response } from 'express'
import { ISandwich } from '../interfaces/ISandwitch'
import { generarPago } from '../services/mercadoPago.services'

const crearOrden = async (req: Request, res: Response): Promise<Response> => {
  try {
    const listaProductos = req.body.productos as ISandwich[]
    console.log('LISTA DE PRODUCTOS A COMPRAR ==>', listaProductos)
    const response = await generarPago(listaProductos)
    return res.status(200).json({ init_point: response })
  } catch (error: any) {
    console.log(error)
    return res.status(500).json({ msg: error.message })
  }
}

export { crearOrden }
