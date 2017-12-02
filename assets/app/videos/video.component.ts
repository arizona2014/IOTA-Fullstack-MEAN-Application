import { Component, Input } from "@angular/core";
import { Video } from "./video.model";
import { VideoService } from "./video.service";

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styles: [`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;            
        }
        .config{
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;                
        }
    `]
})
export class VideoComponent {

    @Input() video: Video;

    constructor(private videoService: VideoService){ }

    onEdit(){
        this.videoService.editVideo(this.video);
    }

    onDelete(){
        this.videoService.deleteVideo(this.video)
            .subscribe(
                result => console.log(result)
            );
    }

    belongsToUser(){
        if(this.video){
            return localStorage.getItem('userId') == this.video.userId;
        } else {
            return false;
        }
    }

}