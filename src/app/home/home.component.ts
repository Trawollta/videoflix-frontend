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
      this.groupedVideos = data;
    }, (error) => {
      console.error('Fehler beim Laden der gruppierten Videos', error);
    });
  }

  
  openVideo(videoId: number, videoUrl: string): void {
    this.router.navigate(['/video', videoId]);
  }
}
