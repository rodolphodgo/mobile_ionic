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
  // colocar chave api certa aqui
  private readonly API_KEY = 'YOUR_TMDB_API_KEY';
  private readonly BASE_URL = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  
  getPopularMovies(): Observable<{ results: Movie[] }> {
    const url = `${this.BASE_URL}/movie/popular?api_key=${this.API_KEY}&language=pt-BR`;
    
  
    return this.http.get<{ results: Movie[] }>(url);
  }
}