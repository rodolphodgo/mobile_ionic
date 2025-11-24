import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth/auth.service';


const isAuthenticated = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLogged()) {
    return true;
  }


  return router.parseUrl('/login');
};


export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then(m => m.SignupPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
    canActivate: [isAuthenticated],
  },
  {
    path: 'filmes',
    loadComponent: () => import('./list-movies/list-movies.page').then(m => m.ListMoviesPage),
    canActivate: [isAuthenticated],
  },
  {
    path: 'movie-details/:id',
    loadComponent: () => import('./movie-details/movie-details.page').then(m => m.MovieDetailsPage),
    canActivate: [isAuthenticated],
  },
  {
    path: 'movie-review/:id', 
    loadComponent: () => import('./movie-review/movie-review.page').then(m => m.MovieReviewPage),
    canActivate: [isAuthenticated],
  },
  {
    path: 'my-reviews',
    loadComponent: () => import('./my-reviews/my-reviews.page').then(m => m.MyReviewsPage),
    canActivate: [isAuthenticated],
  },
  
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];