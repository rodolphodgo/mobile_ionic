import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  popularity: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly API_KEY = 'c6f87d5b5bcd487c1bc979a886da76c4';
  private readonly BASE_URL = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getTrending(): Observable<{ results: Movie[] }> {
    return this.http.get<{ results: Movie[] }>(
      `${this.BASE_URL}/trending/movie/day?api_key=${this.API_KEY}&language=pt-BR`
    );
  }

  getPopularMovies(): Observable<{ results: Movie[] }> {
    return this.http.get<{ results: Movie[] }>(
      `${this.BASE_URL}/movie/popular?api_key=${this.API_KEY}&language=pt-BR`
    );
  }

  getMovie(id: string | number): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.BASE_URL}/movie/${id}?api_key=${this.API_KEY}&language=pt-BR`
    );
  }
}
