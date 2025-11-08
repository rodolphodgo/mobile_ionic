import { Component, OnInit } from '@angular/core';
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
    TruncatePipe
  ],
})
export class ListMoviesPage implements OnInit { 
  movies: Movie[] = [];
  isLoading = true; 

  constructor(private movieService: MovieService) {}

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
}