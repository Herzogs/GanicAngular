import { MercadoPagoConfig, Preference } from 'mercadopago'
import { ISandwich } from '../interfaces/ISandwitch'

const generarPago = async (listaProductos: ISandwich[]): Promise<string | undefined> => {
  // Crea un objeto de preferencia
  const preferencia = new Preference(
    new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN as string })
  )
  console.log('LISTA DE PRODUCTOS A COMPRAR BACK ==>', listaProductos)

  // Itero sobre la lista de productos para generar lista de items
  const listaItems: any[] = []
  listaProductos.forEach((producto) => {
    listaItems.push({
      title: producto.nombre,
      description: producto.descripcion,
      unit_price: 3600,
      quantity: 1
    })
  })

  // Genero la preferencia
  const preference = {
    items: listaItems,
    back_urls: {
      success: 'http://localhost:3000/api/pago/pagoAceptado',
      failure: 'http://localhost:3000/api/pago/pagoRechazado',
      pending: 'http://localhost:3000/api/pago/pagoPendiente'
    },
    auto_return: 'approved',
    binary_mode: true
  }

  // Creo la preferencia y devuelvo el init_point
  return await preferencia.create({ body: preference })
    .then((response) => {
      console.log('RESPONSE ==>', response.init_point)
      return response.init_point
    }).catch((error) => {
      console.log(error)
      throw new Error('Error al generar el pago')
    })
}

export { generarPago }
