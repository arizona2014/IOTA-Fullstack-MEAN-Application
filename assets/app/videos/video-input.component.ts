import {Component, OnInit} from "@angular/core";
import {MessageService} from "./messages.service";
import {NgForm} from "@angular/forms";
import {Message} from "./message.model";
import {VideoService} from "./video.service";

@Component({
    selector: 'app-video-input',
    templateUrl: './video-input.component.html'
})

export class VideoInputComponent implements OnInit {

    video: Video;

    constructor (private videoService: VideoService){ }

    ngOnInit(){
        this.videoService.videoIsEdit.subscribe(
            (video: Video) => this.video = video
        )
    }

    onSubmit(form: NgForm){
        if(this.video){
            this.video.content = form.value.content;
            this.videoService.updateVideo(this.video)
                .subscribe(
                    result => console.log(result)
                );

            this.video = null;
        } else {
            const video = new Video(form.value.content,'Andy', 'http://www.google.com');
            this.videoService.addVideo(video)
                .subscribe(
                    data => console.log(data),
                    error => console.log(error)
                );
        }
        form.resetForm();
    }

    onClear(form: NgForm){
        this.video = null;
        form.resetForm();
    }

}
