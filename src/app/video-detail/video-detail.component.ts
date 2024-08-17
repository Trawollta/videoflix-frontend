import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VideoService } from '../services/video-service';
import { Video } from '../interfaces/video';

@Component({
  selector: 'app-video-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit {
  video?: Video;
  selectedQuality: string = '1080p';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private videoService: VideoService
  ) { }

  ngOnInit(): void {
    const videoId = this.route.snapshot.paramMap.get('id');
    if (videoId) {
      this.videoService.getVideo(+videoId).subscribe((data: Video) => {
        this.video = data;
        this.autoSelectQuality();
      });
    }
    console.log('Video URL für die ausgewählte Qualität:', this.getVideoUrl());
  }

  getVideoUrl(): string {
    const url = this.video?.video_files[this.selectedQuality] || '';
    return url;
  }

  autoSelectQuality(): void {
    if (!this.getVideoUrl()) {
      if (this.video?.video_files['1080p']) {
        this.selectedQuality = '1080p';
      } else if (this.video?.video_files['720p']) {
        this.selectedQuality = '720p';
      } else if (this.video?.video_files['480p']) {
        this.selectedQuality = '480p';
      }
    }
  }

  onQualityChange(): void {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      videoElement.src = this.getVideoUrl();
      videoElement.load(); 
      videoElement.play();
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
