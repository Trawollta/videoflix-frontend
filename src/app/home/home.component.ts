import { Component, OnInit } from '@angular/core';
import { VideoService } from '../services/video-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GroupedVideos } from '../interfaces/video';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  groupedVideos: GroupedVideos[] = [];
  lastVideoUrl: string | null = null;

  constructor(private videoService: VideoService, private router: Router) { }

  ngOnInit(): void {
    this.videoService.getGroupedVideos().subscribe((data: GroupedVideos[]) => {
      console.log(data);  // Überprüfen Sie hier die Struktur der zurückgegebenen Daten
      this.groupedVideos = data;
    }, (error) => {
      console.error('Fehler beim Laden der gruppierten Videos', error);
    });

    // Letztes Video abrufen
    this.lastVideoUrl = this.videoService.getLastVideo();
  }

  openVideo(videoId: number, videoUrl: string): void {
    this.videoService.setLastVideo(videoUrl);
    this.router.navigate(['/video', videoId]);
  }
}
