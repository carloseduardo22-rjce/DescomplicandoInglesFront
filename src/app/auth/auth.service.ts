import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() { }

  login(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('loggedIn', 'true'); // Define um indicador de login
    }
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('token'); // Remove o token e o estado de login
    }
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('loggedIn'); // Verifica se o usuário está logado
    }
    return false; // Retorna falso caso esteja no servidor
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token'); // Retorna o token, se disponível
    }
    return null; // Retorna null caso esteja no servidor
  }
}
