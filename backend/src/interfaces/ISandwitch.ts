export interface ISandwich {
  id: number
  nombre: string
  descripcion: string
  clasificacion: string
  imagen: string
  precio: number
}

export type ISandwichMP = Omit<ISandwich, 'id' | 'clasificacion' | 'imagen'>

export type SandwichInput = Omit<ISandwich, 'id'>
