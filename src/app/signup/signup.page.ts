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
  IonBackButton 
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

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
    IonBackButton
  ],
})
export class SignupPage implements OnInit {

  email = '';
  username = '';
  password = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onRegister() {
    console.log('Dados de Cadastro:', {
      email: this.email,
      username: this.username,
      password: this.password,
    });
    

    alert('Conta criada com sucesso! Faça login para continuar.');
    this.router.navigate(['/home']);
  }
}