import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export interface MovieReview {
  movieId: string;
  userId: string; 
  reviewText: string;
  rating: number;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly REVIEWS_KEY = 'all_movie_reviews';

  constructor(private authService: AuthService) {}


  private getLocalReviews(): MovieReview[] {
    const data = localStorage.getItem(this.REVIEWS_KEY);
    if (!data) return [];

    const reviews = JSON.parse(data);
    return reviews.map((r: any) => ({
      ...r,

      createdAt: new Date(r.createdAt)
    }));
  }


  async addReview(review: Omit<MovieReview, 'userId' | 'createdAt'>): Promise<void> {
    const userId = this.authService.getUserId();
    if (!userId) throw new Error("Usuário não autenticado.");

    const newReview: MovieReview = {
      ...review,
      userId: userId,
      createdAt: new Date()
    };

    let allReviews = this.getLocalReviews();
    
 
    allReviews = allReviews.filter(
      r => !(r.movieId === newReview.movieId && r.userId === newReview.userId)
    );
    
    allReviews.push(newReview);
 
    localStorage.setItem(this.REVIEWS_KEY, JSON.stringify(allReviews));
  }


  async getAllReviewsByMovie(movieId: string): Promise<MovieReview[]> {
    const allReviews = this.getLocalReviews();
    return allReviews.filter(r => r.movieId === movieId);
  }

 
  async getMyReviewByMovie(movieId: string): Promise<MovieReview | undefined> {
    const userId = this.authService.getUserId();
    if (!userId) return undefined;
    
    const allReviews = await this.getAllReviewsByMovie(movieId);
    return allReviews.find(r => r.userId === userId);
  }


  async getMyAllReviews(): Promise<MovieReview[]> {
    const userId = this.authService.getUserId();
    if (!userId) return [];

    const allReviews = this.getLocalReviews();
    return allReviews.filter(r => r.userId === userId);
  }

 
  async deleteReview(reviewToDelete: MovieReview): Promise<void> {
    const userId = this.authService.getUserId();
    if (!userId || userId !== reviewToDelete.userId) {
        throw new Error("Não autorizado para deletar esta crítica.");
    }

    let allReviews = this.getLocalReviews();
    
    allReviews = allReviews.filter(
        r => !(r.movieId === reviewToDelete.movieId && r.userId === userId)
    );
    
    localStorage.setItem(this.REVIEWS_KEY, JSON.stringify(allReviews));
  }
}