import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonPopover, IonList, IonItem, IonLabel, IonBadge, IonSpinner, IonThumbnail } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { HighlightDirective } from '../directives/highlight.directive';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { AuthService } from '../services/auth/auth.service';
import { addIcons } from 'ionicons';
import { logOutOutline, personCircleOutline, starOutline, createOutline } from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HighlightDirective,
    TruncatePipe,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonPopover, IonList, IonItem, IonLabel, IonBadge, IonSpinner, IonThumbnail
  ]
})
export class HomePage implements OnInit {
  highlights: any[] = [];
  trending: any[] = [];
  recommended: any[] = [];
  imageBase = 'https://image.tmdb.org/t/p/w500';
  username: string = 'Visitante'; 

  constructor(
    private movieService: MovieService, 
    private router: Router,
    private auth: AuthService 
  ) {
    addIcons({ logOutOutline, personCircleOutline, starOutline, createOutline });
  }

  ngOnInit() {
    this.loadMovies();
    this.loadUserInfo();
  }

  loadUserInfo() {
    const user = this.auth.getUser();
    if (user && user.username) {
        this.username = user.username;
    } 
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
  
  logout(event: any) {
    const popover = event.target.closest('ion-popover');
    if (popover) {
        popover.dismiss();
    }
    this.auth.logout();
    this.router.navigate(['/login']); 
  }

  goToMyReviews(event: any) {
    const popover = event.target.closest('ion-popover');
    if (popover) {
        popover.dismiss();
    }
    this.router.navigate(['/my-reviews']);
  }
}