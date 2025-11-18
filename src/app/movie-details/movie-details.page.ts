import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonIcon, 
  IonBackButton, 
  IonButtons,
  IonLabel,
  IonCard, 
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

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
    IonLabel,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent
  ],
})
export class MovieDetailsPage implements OnInit {
  movieId: string | null = null;
  movieDetails: any = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
   
    this.movieId = this.route.snapshot.paramMap.get('id');
    

    if (this.movieId) {
      this.movieDetails = {
        title: `Filme ID ${this.movieId}`,
        subtitle: 'Aventura/Ficção',
        overview: `Esta é a descrição detalhada do Filme com ID ${this.movieId}. Clique para deixar sua crítica.`,
      };
    }
  }
}