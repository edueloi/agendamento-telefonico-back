import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  login(token: string) {
    console.log('Salvando token no localStorage:', token); // 👀 Debug
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    console.log('Verificando autenticação. Token:', token); // 👀 Debug
    return token !== null;
  }
}
