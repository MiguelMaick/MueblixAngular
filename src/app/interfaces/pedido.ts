import { Producto } from "./producto";
import { Usuario } from "./usuario";

export interface DireccionEnvio {
    calle?: string,
    codigoPostal?: string,
    estado?:string;
}

export interface Pago {
    metodo_pago: string,
    estatus: string;
}

export interface Pedido {
    _id?: string,
    usuario: string | Usuario,
    producto: string | Producto,

    cantidad: number,
    total: number,
    fecha_pedido?:Date;
    estado: string,
    direccion_envio: DireccionEnvio;
    pago: Pago;

    createdAt?: Date;
    updateAt?: Date;
}
