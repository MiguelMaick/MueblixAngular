import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  private userData = new BehaviorSubject<any>(null);
  userData$ = this.userData.asObservable();

  constructor() {
    this.loadUserFromStorage();
  }

  loadUserFromStorage() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.userData.next(null);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userData.next(payload);
    } catch {
      this.userData.next(null);
    }
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.loadUserFromStorage();
  }

  logout() {
    localStorage.removeItem('token');
    this.userData.next(null);
  }
}
