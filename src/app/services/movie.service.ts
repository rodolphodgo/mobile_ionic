import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface simples para o tipo de dados que esperamos
// (Você pode expandir esta interface conforme necessário)
export interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  // ⚠️ Substitua 'YOUR_TMDB_API_KEY' pela sua chave real da TMDB
  private readonly API_KEY = 'YOUR_TMDB_API_KEY';
  private readonly BASE_URL = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  /**
   * Obtém a lista de filmes populares.
   * Cobre o requisito do método GET.
   * @returns Observable de uma array de filmes.
   */
  getPopularMovies(): Observable<{ results: Movie[] }> {
    const url = `${this.BASE_URL}/movie/popular?api_key=${this.API_KEY}&language=pt-BR`;
    
    // O método GET é usado aqui:
    return this.http.get<{ results: Movie[] }>(url);
  }
}