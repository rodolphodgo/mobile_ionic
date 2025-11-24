import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly LOGGED_USER_KEY = 'app_logged_user'; 
  private readonly ALL_USERS_KEY = 'app_all_users';     


  private getAllRegisteredUsers(): any[] {
    const data = localStorage.getItem(this.ALL_USERS_KEY);
    return data ? JSON.parse(data) : [];
  }


  private ensureUserId(user: any): string {
    if (!user.userId) {
      user.userId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    return user.userId;
  }





  login(username: string, password: string) {
    const allUsers = this.getAllRegisteredUsers();

    const user = allUsers.find(u => u.username === username);

    if (!user) {
      return { success: false, message: 'Usuário não cadastrado.' };
    }


    if (user.password === password) {
  
      this.ensureUserId(user); 
      localStorage.setItem(this.LOGGED_USER_KEY, JSON.stringify(user));
      

      localStorage.setItem(this.ALL_USERS_KEY, JSON.stringify(allUsers.map(u => u.username === username ? user : u)));

      return { success: true, message: 'Login realizado com sucesso.' };
    }

    return { success: false, message: 'Nome de usuário ou senha incorretos.' };
  }

  register(username: string, email: string, password: string) {
    let allUsers = this.getAllRegisteredUsers();


    if (allUsers.some(u => u.username === username)) {
      return { success: false, message: 'Nome de usuário já está em uso.' };
    }
    if (allUsers.some(u => u.email === email)) {
      return { success: false, message: 'E-mail já cadastrado.' };
    }

    const newUser = { username, email, password, userId: '' };
    this.ensureUserId(newUser); 

 
    allUsers.push(newUser);
    localStorage.setItem(this.ALL_USERS_KEY, JSON.stringify(allUsers));

    return { success: true, message: 'Cadastro realizado com sucesso.' };
  }

  isLogged() {
    return localStorage.getItem(this.LOGGED_USER_KEY) !== null;
  }

  logout() {
    localStorage.removeItem(this.LOGGED_USER_KEY);
  }

  getUser() {
    const data = localStorage.getItem(this.LOGGED_USER_KEY);
    const user = data ? JSON.parse(data) : null;
    return user;
  }

  getUserId(): string | null {
    const user = this.getUser();
    return user ? user.userId : null;
  }
}