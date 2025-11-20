export interface Caracteristicas {
    tipo: string,
    descripcion: string,
    color: string,
    peso: number
}

export interface Producto {
    _id: string,
    nombre: string,
    precio: string,
    cantidad: number,
    estatus?: 'existente' | 'agotado' | string,
    caracteristicas: Caracteristicas,
    categoria: string,
    imagen: string [],

    createdAt?: Date,
    updatedAt?: Date
}
