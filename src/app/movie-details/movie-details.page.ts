import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonSpinner,
  ModalController
} from '@ionic/angular/standalone';
import { CommonModule, DatePipe } from '@angular/common';
import { MovieService } from '../services/movie.service';
import { DataService, MovieReview } from '../services/data/data.service';
import { MovieReviewPage } from '../movie-review/movie-review.page';
import { addIcons } from 'ionicons';
import { star, createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonSpinner,
    DatePipe,
    MovieReviewPage
  ],
  providers: [DatePipe]
})
export class MovieDetailsPage implements OnInit {
  movie: any = null;
  imageBase = 'https://image.tmdb.org/t/p/w500';
  allReviews: MovieReview[] = [];
  averageRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private modalController: ModalController,
    private dataService: DataService
  ) {
      addIcons({ star, createOutline });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.movieService.getMovie(id).subscribe((res) => {
        this.movie = res;
        this.loadAllReviews(id);
      });
    }
  }

  async loadAllReviews(movieId: string) {
    this.allReviews = await this.dataService.getAllReviewsByMovie(movieId);
    this.calculateAverageRating();
  }

  calculateAverageRating() {
    if (this.allReviews.length === 0) {
      this.averageRating = 0;
      return;
    }
    const totalRating = this.allReviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = parseFloat((totalRating / this.allReviews.length).toFixed(1));
  }

  async goToReview() {
    if (!this.movie || !this.movie.id) return;

    try {
      const modal = await this.modalController.create({
        component: MovieReviewPage, 
        componentProps: {
          'movieId': this.movie.id.toString()
        },
        cssClass: 'movie-review-modal' 
      });

      await modal.present();

      const { data } = await modal.onDidDismiss();
      if (data && data.reviewSaved) { 
          this.loadAllReviews(this.movie.id.toString());
      }
    } catch (e) {
      console.error('Erro ao abrir o modal de revisão:', e);
      alert('Erro ao carregar a janela de crítica. Verifique o console.');
    }
  }
}