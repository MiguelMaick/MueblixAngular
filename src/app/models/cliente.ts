export interface Cliente {
    _id: number;
    nombres: string;
    apellidos: string;
    email: string;
    password: string;
    foto?: string;
    telefono: string;
    estatus?: 'activo' | 'inactivo';
    direccion: Direccion;
}

export interface Direccion {
    calle: string;
    codigoPostal: number;
    estado: string;
}

export interface CreateClienteDTO extends Omit<Cliente, '_id'>{}
