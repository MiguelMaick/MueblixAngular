import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthModel } from '../models/auth';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private url = 'http://localhost:3000/usuario';

  // 🔹 BehaviorSubject para mantener el usuario logueado
  private userSubject = new BehaviorSubject<Cliente | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    // Si hay token en localStorage, cargamos el perfil automáticamente
    const token = localStorage.getItem('token');
    if (token) {
      this.loadProfile(token).subscribe();
    }
  }

  // Login del cliente
  login(email: string, password: string): Observable<AuthModel> {
    return this.http.post<AuthModel>(`${this.url}/login`, { email, password }).pipe(
      tap(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.loadProfile(res.token).subscribe(); // carga perfil al instante
        }
      })
    );
  }

  // Cargar perfil y actualizar BehaviorSubject
  loadProfile(token: string): Observable<Cliente> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Cliente>(`${this.url}/profile`, { headers }).pipe(
      tap(usuario => this.userSubject.next(usuario))
    );
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }
}
