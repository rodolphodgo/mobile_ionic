import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'filmes',
    loadComponent: () => import('./list-movies/list-movies.page').then((m) => m.ListMoviesPage),
  },
  {
    path: 'cadastro', // Rota de Cadastro
    loadComponent: () => import('./signup/signup.page').then((m) => m.SignupPage),
  },
  {
    path: 'filme-detalhe/:id',
    loadComponent: () => import('./movie-details/movie-details.page').then((m) => m.MovieDetailsPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];