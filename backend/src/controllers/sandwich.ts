import { Request, Response } from 'express'
import * as sandwichService from '../services/sandwich'
import { validationResult } from 'express-validator'
import { SandwichInput } from '../interfaces/ISandwitch'

const obtenerSandwitch = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const sandwiches = await sandwichService.obtenerTodosLosSandwiches()
    if (sandwiches.length === 0) {
      return res.status(404).json({ error: 'No se encontraron sándwiches' })
    }
    return res.status(200).json(sandwiches)
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const agregarSandwitch = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array())
  }
  try {
    const imagen = req.file
    if (imagen != null) {
      try {
        console.log(imagen.path)
        const nuevoSandwich: SandwichInput = req.body
        nuevoSandwich.imagen = imagen.filename
        await sandwichService.agregarSandwich(nuevoSandwich)

        return res.status(201).json(req.body)
      } catch (err) {
        return res.status(500).json({ error: 'Error al guardar la imagen' })
      }
    }
    return res.status(400).json({ error: 'No se ha proporcionado una imagen' })
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const obtenerSandwichPorId = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array())
  }
  try {
    const sandwich = await sandwichService.obtenerPorId(req.query.id as unknown as number)
    if (sandwich == null) {
      return res.status(404).json({ error: 'Sándwich no encontrado' })
    }
    return res.status(200).json(sandwich)
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const obtenerListadoSandwichPorClasificacion = async (req: Request, res: Response): Promise<Response> => {
  console.log('entrando a obtenerListadoSandwichPorClasificacion')
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array())
  }
  const sandwich = sandwichService.obtenerListadoSandwichPorClasificacion(req.body.clasificacion)
  return Object.keys(sandwich).length !== 0 ? res.json(sandwich) : res.status(400).json({ mensaje: 'No existen sandwitch para esa clasificación' })
}

export { obtenerSandwitch, agregarSandwitch, obtenerSandwichPorId, obtenerListadoSandwichPorClasificacion }
