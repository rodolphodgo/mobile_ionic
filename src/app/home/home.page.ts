import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from '../services/movie.service';
import { HighlightDirective } from '../directives/highlight.directive';
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HttpClientModule,
    HighlightDirective,
    TruncatePipe
  ]
})
export class HomePage implements OnInit {
  highlights: any[] = [];
  trending: any[] = [];
  recommended: any[] = [];
  imageBase = 'https://image.tmdb.org/t/p/w500';

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getTrending().subscribe((res: any) => {
      const results = res.results || [];
      this.trending = results;
      this.highlights = results.slice(0, 6);
      this.recommended = results.slice(6, 18);
    });
  }

  openMovie(id: number) {
    this.router.navigate(['/movie-details', id]);
  }
}
