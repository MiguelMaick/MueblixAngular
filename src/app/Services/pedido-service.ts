import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  
  private baseUrl = 'http://localhost:3000/pedido';

  constructor(private http: HttpClient) {}

  getPedidos(): Observable<Pedido[]> {
  const token = localStorage.getItem('token');

  if (!token) {
    console.warn("❗ No hay token, no se puede cargar pedidos");
    return new Observable<Pedido[]>(observer => {
      observer.next([]);  // Devuelve un array vacío
      observer.complete();
    });
  }

  return this.http.get<Pedido[]>(this.baseUrl, {
    headers: { Authorization: `Bearer ${token}` }
  });
}



}
