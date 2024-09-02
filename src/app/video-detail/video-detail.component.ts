import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VideoService } from '../services/video-service';
import { Video } from '../interfaces/video';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-detail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit, OnDestroy {
  videoId: string | null = null;
  video: Video | null = null;
  selectedQuality: string = '1080p'; 
  private routeSub: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => { 
      this.videoId = params.get('id');
    
      if (this.videoId !== null) {
        this.videoService.getVideo(+this.videoId).subscribe((data: Video) => {
          this.video = data;
          this.autoSelectQuality(); 
        }, (error) => {
          console.error('Fehler beim Laden des Videos:', error);
        });
      } else {
        console.error('Video-ID ist null');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  autoSelectQuality(): void {
    if (this.video) {
      if (this.video.video_file_1080p) {
        this.selectedQuality = '1080p';
      } else if (this.video.video_file_720p) {
        this.selectedQuality = '720p';
      } else if (this.video.video_file_480p) {
        this.selectedQuality = '480p';
      }
    }
  }

  getVideoUrl(): string {
    if (this.video) {
      const url = this.selectedQuality === '480p' ? this.video.video_files['480p'] :
                  this.selectedQuality === '720p' ? this.video.video_files['720p'] :
                  this.selectedQuality === '1080p' ? this.video.video_files['1080p'] : '';
      return url || '';
    }
    return '';
  }

  onQualityChange(): void {

  }

  goBack(): void {
    this.videoId = null;
    this.video = null;
    this.selectedQuality = '1080p';

    this.router.navigate(['/home']);
  }
}
