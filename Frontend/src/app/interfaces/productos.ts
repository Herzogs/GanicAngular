export interface IProducto{
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    clasificacion: string;
}

export type IProductoCreado = Omit<IProducto, 'id' | 'imagen'>;