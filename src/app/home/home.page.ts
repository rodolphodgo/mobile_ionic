import { Component } from '@angular/core';
import {
  IonContent, // Já existia
  IonTitle,   // Adicionado para o título Bem-vindo(a)!
  IonInput,   // Adicionado para os campos de texto
  IonItem,    // Adicionado para envolver os inputs
  IonButton,  // Adicionado para os botões
  IonIcon     // Adicionado para os ícones
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'], // Ainda aponta para o SCSS
  imports: [
    IonContent,
    IonTitle,
    IonInput,
    IonItem,
    IonButton,
    IonIcon // Não esqueça de adicionar IonIcon aqui!
  ],
})
export class HomePage {
  constructor() {}
}