import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonIcon, 
  IonInput, 
  IonItem,
  IonButtons, 
  IonBackButton,
  ToastController, 
  IonToast          
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

import { AuthService } from '../services/auth/auth.service'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButton, 
    IonIcon, 
    IonInput, 
    IonItem,
    IonButtons,
    IonBackButton,
    IonToast 
  ],
})
export class SignupPage implements OnInit {

  email = '';
  username = '';
  password = '';
  error = ''; 

  constructor(
    private router: Router,
    private auth: AuthService, 
    private toastController: ToastController 
  ) { }

  ngOnInit() {
  }


  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, 
      position: 'top',
      color: color, 
      buttons: [{ text: 'OK', role: 'cancel' }]
    });
    
    await toast.present();
  }


  onRegister() {
    this.error = ''; 
    

    if (!this.email || !this.password || !this.username) {
      this.error = 'Todos os campos (Usuário, E-mail, Senha) são obrigatórios.';
      this.presentToast(this.error, 'warning');
      return;
    }
    
    const result = this.auth.register(this.username, this.email, this.password);

    if (result.success) {
      this.presentToast('Conta criada com sucesso! Faça login para continuar.', 'success');
      this.router.navigate(['/login']); 
      
    } else {
      this.error = result.message || 'Erro ao criar conta. Tente novamente.';
      this.presentToast(this.error, 'danger');
    }
  } 

  goToLogin() {
    this.router.navigate(['/login']);
  }
}