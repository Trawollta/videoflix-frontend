import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video, GroupedVideos } from '../interfaces/video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseUrl = 'http://127.0.0.1:8000/videos/';
  private readonly lastVideoKey = 'lastVideo';

  constructor(private http: HttpClient) { }

  setLastVideo(videoUrl: string): void {
    localStorage.setItem(this.lastVideoKey, videoUrl);
  }

  getLastVideo(): string | null {
    return localStorage.getItem(this.lastVideoKey);
  }

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.baseUrl}`);
  }

  getVideo(id: number): Observable<Video> {
    return this.http.get<Video>(`${this.baseUrl}${id}/`);
  }

  getGroupedVideos(): Observable<GroupedVideos[]> {
    return this.http.get<GroupedVideos[]>(`${this.baseUrl}api/grouped-videos/`);
  }
}
