import {  CategoriaModel } from './categoria';

export interface Productos {
  _id: string;
  nombre: string;
  precio: string;           
  cantidad: number;
  estatus: 'existente' | 'agotado';
  categoria: CategoriaModel;
  imagen: string[];          
  caracteristicas: Caracteristicas; 
}

export interface Caracteristicas {
  tipo: string;
  descripcion: string;
  color: string;
  peso: number;
}


