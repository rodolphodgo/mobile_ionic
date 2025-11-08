import { Component } from '@angular/core';
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
    IonIcon
  ],
})
export class HomePage {
  constructor() {}
}