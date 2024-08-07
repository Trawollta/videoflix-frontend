export interface Video {
  id: number;
  title: string;
  description: string;
  cover_file: string;
  video_files: { [key: string]: string };
  video_file_1080p: string;
  video_file_720p: string;
  video_file_480p: string;
  category: string;
  uploaded_at: string;
  }

  export interface GroupedVideos {
    category: string;
    videos: Video[];
  }