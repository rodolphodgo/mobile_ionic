import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonIcon, ToastController, IonToast, IonSpinner } from '@ionic/angular/standalone'; 
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonToast,
    IonSpinner
  ]
})
export class LoginPage {
  username = '';
  password = '';
  error = '';
  isLoading = false;

  constructor(
    private auth: AuthService, 
    private router: Router, 
    private toastController: ToastController
  ) {}

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
        }
      ]
    });
    
    await toast.present();
    return toast;
  }

  async login() {
    this.error = '';

    if (!this.username || !this.password) {
      this.error = 'Por favor, preencha Usuário e Senha.';
      await this.presentToast(this.error, 'warning');
      return;
    }
    
    this.isLoading = true;

    try {
      const result = this.auth.login(this.username, this.password);

      if (result.success) {
        const toast = await this.presentToast(result.message, 'success');
        await toast.onDidDismiss(); 
        this.router.navigate(['/home']);
      } else {
        this.error = result.message; 
        await this.presentToast(this.error, 'danger');
      }
    } finally {
      this.isLoading = false;
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}