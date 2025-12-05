import { Cliente } from './cliente';
import { Productos } from './productos';

export interface Pedido {
createdAt: string|number|Date;
    _id: string;
    producto: Productos[];
    cliente: Cliente;
    cantidad: number;
    total: number;
    fecha_pedido: Date;
    direccion_envio: Direccion;
    pago: Pago;
}

export interface Direccion {
    calle: string;
    codigoPostal: number;
    estado: string;
}

export interface Pago {
    metodo: string;
    estatus: number;
    fecha_pago: Date;
}
