import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Productos } from '../models/productos';
import { Observable } from 'rxjs';
import { CategoriaModel } from '../models/categoria';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private url = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
  ) { }

  getProductos(limit: number, offset: number): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.url + 'producto', {
      params: new HttpParams()
        .set('limit', limit.toString())
        .set('offset', offset.toString()),
    });
  }

  getByCategoria(_id: string): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${this.url}producto/${_id}/categoria`);
  }

  getCategorias(): Observable<CategoriaModel[]> {
    return this.http.get<CategoriaModel[]>(this.url + 'categoria');
  }

  getProductosMayorPrecio(): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${this.url}producto/precio-mayor`);
  }

  getProductosMenorPrecio(): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${this.url}producto/precio-menor`);
  }
}


