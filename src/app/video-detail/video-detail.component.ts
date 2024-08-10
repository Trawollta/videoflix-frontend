import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
      });
    }
  }

  getVideoUrl(): string {
    return this.video?.video_files[this.selectedQuality] || '';
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
