import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonNote, IonCard, IonCardContent, IonIcon, IonButtons, IonBackButton, IonButton, ToastController
} from '@ionic/angular/standalone';
import { DataService, MovieReview } from '../services/data/data.service';
import { AuthService } from '../services/auth/auth.service';
import { addIcons } from 'ionicons';
import { trashOutline, star } from 'ionicons/icons';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.page.html',
  styleUrls: ['./my-reviews.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonNote, IonCard, IonCardContent, IonIcon, IonButtons, IonBackButton, IonButton, DatePipe
  ],
  providers: [DatePipe]
})
export class MyReviewsPage implements OnInit {
  myReviews: MovieReview[] = [];

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    addIcons({ trashOutline, star });
  }

  ngOnInit() {
    // Garante que o usuário está logado antes de carregar
    if (!this.authService.isLogged()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadMyReviews();
  }
  
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color,
    });
    await toast.present();
  }

  async loadMyReviews() {
    try {
      this.myReviews = await this.dataService.getMyAllReviews();
    } catch (error) {
      this.presentToast('Erro ao carregar suas críticas.', 'danger');
    }
  }

  async deleteReview(review: MovieReview) {
    // Em uma aplicação real, você usaria um modal de confirmação, mas aqui usamos o try/catch
    try {
      await this.dataService.deleteReview(review);
      this.presentToast('Crítica removida com sucesso!', 'success');
      this.loadMyReviews(); // Recarrega a lista
    } catch (error: any) {
      this.presentToast(error.message || 'Falha ao remover crítica.', 'danger');
    }
  }
}