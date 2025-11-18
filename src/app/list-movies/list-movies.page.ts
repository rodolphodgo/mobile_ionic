import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
  IonSpinner
} from '@ionic/angular/standalone';
import { MovieService, Movie } from '../services/movie.service';
import { CommonModule } from '@angular/common'; 
import { TruncatePipe } from '../pipes/truncate.pipe';
import { HighlightDirective } from '../directives/highlight.directive';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.page.html',
  styleUrls: ['./list-movies.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonList,
    IonListHeader,
    IonLabel,
    IonItem,
    IonSpinner,
    CommonModule,
    TruncatePipe,
    HighlightDirective
  ],
})
export class ListMoviesPage implements OnInit { 
  movies: Movie[] = [];
  isLoading = true; 

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getPopularMovies().subscribe({
      next: (data) => {
        this.movies = data.results;
        this.isLoading = false;
        console.log('Filmes carregados:', this.movies);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erro ao carregar filmes:', err);
      }
    });
  }
  

  goToDetails(movieId: number) {
    this.router.navigate(['/filme-detalhe', movieId]);
  }
}