export interface DireccionUsuario{
    calle?: string,
    codigoPago?: string,
    estado: string,
}

export interface Usuario {
    _id: string,
    nombres: string,
    apellidos: string,
    email: string,
    password?: string,
    foto?: string,
    estatus?: 'activo' | 'inactivo' | string,
    direccion?: DireccionUsuario,
    telefono?: string,
    
    createdAt?: Date,
    updateAt?: Date;
}
