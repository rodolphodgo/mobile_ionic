import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import {
  IonContent,
  IonTitle,
  IonInput,
  IonItem,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonContent,
    IonTitle,
    IonInput,
    IonItem,
    IonButton,
    IonIcon,
    FormsModule 
  ],
})
export class HomePage {
  usernameOrEmail = '';
  password = '';       

  constructor(private router: Router) {} 

  onLogin() {
    
    if (this.usernameOrEmail && this.password) {
      console.log('Login successful. Navigating to movies list.');
      this.router.navigate(['/filmes']); 
    } else {
      alert('Por favor, preencha o usuário/email e a senha.');
    }
  }

  onSignup() {
   
    this.router.navigate(['/cadastro']); 
  }
}