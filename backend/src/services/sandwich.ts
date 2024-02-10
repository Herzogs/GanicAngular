import { ISandwich, SandwichInput } from '../interfaces/ISandwitch'
import SandwichModel from './../models/sandwich.model'

const obtenerTodosLosSandwiches = async (): Promise<ISandwich[]> => {
  return await SandwichModel.sync()
    .then(async () => {
      return await SandwichModel.findAll({})
    })
    .then((sandwiches) => {
      return sandwiches.map((el) => el.get({ plain: true }))
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

const agregarSandwich = async (sandwitchInput: SandwichInput): Promise<ISandwich> => {
  return await SandwichModel.create(sandwitchInput)
    .then(sandwich => {
      return sandwich.get({ plain: true })
    })
    .catch(error => {
      console.log(error)
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('El sandwich ya existe')
      } else {
        throw new Error('No se pudo agregar el sandwich')
      }
    })
}

const obtenerPorId = async (id: number): Promise<ISandwich> => {
  const sandwich = await SandwichModel.findByPk(id)
  if (sandwich === null) {
    throw new Error('El sandwich no fue encontrado')
  }
  return sandwich.get({ plain: true })
}

const obtenerListadoSandwichPorClasificacion = async (clasificacion: string): Promise<ISandwich[]> => {
  return await SandwichModel.findAll({ where: { clasificacion } })
    .then((sandwiches) => {
      return sandwiches.map((el) => el.get({ plain: true }))
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

export { obtenerTodosLosSandwiches, agregarSandwich, obtenerPorId, obtenerListadoSandwichPorClasificacion }
