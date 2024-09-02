import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video, GroupedVideos } from '../interfaces/video';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseUrl = `${environment.apiUrl}videos/`;
  private readonly lastVideoKey = 'lastVideo';

  constructor(private http: HttpClient) { }

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
