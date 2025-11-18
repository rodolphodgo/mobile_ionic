import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Necessário para @if e @for
import { IonicModule } from '@ionic/angular'; // Necessário para os componentes Ionic
import { FormsModule } from '@angular/forms';

// Seus arquivos personalizados
import { MovieService } from '../services/movie.service';
import { HighlightDirective } from '../directives/highlight.directive';
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.page.html', // Link para o arquivo HTML
  styleUrls: ['./home.page.scss'], // Link para o arquivo CSS
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HighlightDirective, // Sua diretiva
    TruncatePipe        // Seu pipe
  ]
})
export class HomePage implements OnInit {
  // Variáveis que o HTML vai usar
  highlights: any[] = [];
  trending: any[] = [];
  recommended: any[] = [];
  imageBase = 'https://image.tmdb.org/t/p/w500';

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    // Busca os filmes no serviço
    this.movieService.getTrending().subscribe((res: any) => {
      const results = res.results || [];
      this.trending = results;
      this.highlights = results.slice(0, 6);
      this.recommended = results.slice(6, 18);
    });
  }

  // Função para abrir os detalhes
  openMovie(id: number) {
    this.router.navigate(['/movie-details', id]);
  }
}