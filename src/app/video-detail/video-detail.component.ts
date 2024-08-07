import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { VideoService } from '../services/video-service';
import { Video } from '../interfaces/video';

@Component({
  selector: 'app-video-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit {
  video?: Video;
  selectedQuality: string = '480p'; 
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;

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
        this.changeQuality();  // Set the initial video source
      });
    }
  }

  getVideoUrl(): string {
    return this.video?.video_files[this.selectedQuality] || '';
  }

  changeQuality(): void {
    if (this.videoPlayer) {
      const videoElement = this.videoPlayer.nativeElement;
      videoElement.src = this.getVideoUrl();
      videoElement.load();
      videoElement.play();
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
