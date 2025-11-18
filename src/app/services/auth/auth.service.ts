import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'app_user';

  login(email: string, password: string) {
    const savedUser = localStorage.getItem(this.USER_KEY);

    if (!savedUser) {
      return { success: false, message: 'Usuário não encontrado.' };
    }

    const user = JSON.parse(savedUser);

    if (user.email === email && user.password === password) {
      return { success: true, message: 'Login realizado com sucesso.' };
    }

    return { success: false, message: 'Email ou senha incorretos.' };
  }

  register(name: string, email: string, password: string) {
    const user = { name, email, password };
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  isLogged() {
    return localStorage.getItem(this.USER_KEY) !== null;
  }

  logout() {
    localStorage.removeItem(this.USER_KEY);
  }

  getUser() {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }
}
