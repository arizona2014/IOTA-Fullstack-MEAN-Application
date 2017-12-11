import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {VideoService} from "./video.service";
import {Video} from "./video.model";

@Component({
    selector: 'app-video-input',
    templateUrl: './video-input.component.html'
})

export class VideoInputComponent implements OnInit {

    public video: any;

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
            const video = new Video(form.value.content, form.value.link);
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
