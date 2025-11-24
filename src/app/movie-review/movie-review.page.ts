import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonTextarea,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
} from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-movie-review',
  templateUrl: './movie-review.page.html',
  styleUrls: ['./movie-review.page.scss'],
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonTextarea,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent,
  ],
})
export class MovieReviewPage {
  movieId!: string;
  reviewText = '';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.movieId = this.route.snapshot.paramMap.get('id')!;
  }

  saveReview() {
    if (!this.reviewText.trim()) {
      alert('Digite sua crítica antes de enviar.');
      return;
    }

    localStorage.setItem(`review_${this.movieId}`, this.reviewText);

    alert('Sua crítica foi enviada com sucesso!');

    this.router.navigate(['/movie-details', this.movieId]);
  }
}
