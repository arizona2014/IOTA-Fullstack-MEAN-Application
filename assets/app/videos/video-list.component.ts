import { Component } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./messages.service";
import { VideoService } from "./video.service";

@Component({
    selector: 'app-video-list',
    template: `
        <div class=".col-md-8 col-md-offset-2">
            <app-video
                    [video]="video"                    
                    *ngFor="let video of videos"
            >
            </app-video>
        </div>        
    `
})
export class VideoListComponent {

    videos: Video[];

    constructor(private videoService: VideoService){  }

    ngOnInit(){

        this.videoService.getVideos()
            .subscribe(
                (videos: Video[]) => {
                    this.videos = videos;
                }
            );

    }

}