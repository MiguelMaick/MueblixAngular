import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateClienteDTO, Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = 'http://localhost:3000/usuario';

  constructor(
    private http: HttpClient,
  ) { }

  getClientes() {
    return this.http.get<Cliente[]>(this.url);
  }

  createCliente(dto: CreateClienteDTO) {
    return this.http.post<Cliente>(this.url, dto);
  }

  register(dto: CreateClienteDTO) {
    return this.http.post<Cliente>(this.url + '/register', dto);
  }
}
