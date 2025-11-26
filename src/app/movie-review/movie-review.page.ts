import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,IonToolbar,IonTitle,IonContent,IonButtons,IonBackButton,IonTextarea,IonButton,IonIcon,IonCard,IonCardContent,
  ToastController,ModalController,IonModal,IonLabel,IonItem,
} from '@ionic/angular/standalone';
import { CommonModule, DatePipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { star, sendOutline, closeOutline } from 'ionicons/icons'; 
import { DataService, MovieReview } from '../services/data/data.service'; 

@Component({
  standalone: true,
  selector: 'app-movie-review',
  templateUrl: './movie-review.page.html',
  styleUrls: ['./movie-review.page.scss'],
  imports: [
    CommonModule,FormsModule,IonHeader,IonToolbar,IonTitle,IonContent,IonButtons,IonBackButton,IonTextarea,IonButton,IonIcon,
    IonCard,IonCardContent,IonModal,IonLabel,IonItem,DatePipe
  ],
  providers: [DatePipe] 
})
export class MovieReviewPage implements OnInit {
  movieId: string = ''; 
  reviewText = '';
  rating: number = 0;
 
  myReview: MovieReview | undefined; 

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private toastController: ToastController,
    private modalController: ModalController,
    private dataService: DataService 
  ) {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.movieId = routeId;
    }
    addIcons({ star, sendOutline, closeOutline });
  }

  ngOnInit(): void {
    if (this.movieId) { 
        this.loadMyReview();
    }
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

  closeModal() {
    this.modalController.dismiss();
  }
  
  
  async saveReview() {
    if (!this.reviewText.trim() || this.rating === 0) {
      this.presentToast('Digite sua crítica e dê uma nota antes de enviar.', 'warning');
      return;
    }
    
    try {
      
      await this.dataService.addReview({
        movieId: this.movieId,
        reviewText: this.reviewText,
        rating: this.rating
      });

      this.presentToast('Sua crítica foi enviada com sucesso!', 'success'); 
      
      this.modalController.dismiss({ reviewSaved: true }); 

    } catch (error: any) {
        this.presentToast(error.message || 'Erro ao salvar crítica. Tente novamente.', 'danger'); 
    }
  }

 
  async loadMyReview() {
    this.myReview = await this.dataService.getMyReviewByMovie(this.movieId);
    if (this.myReview) {
      this.reviewText = this.myReview.reviewText;
      this.rating = this.myReview.rating;
    }
  }
  
  setRating(value: number) {
    this.rating = value;
  }
}