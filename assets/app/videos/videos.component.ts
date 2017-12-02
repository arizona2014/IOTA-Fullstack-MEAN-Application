import {Component} from "@angular/core";
@Component({
    selector: 'app-videos',
    template: `
        <div class="row">
            <app-video-input></app-video-input>
        </div>
        <hr />
        <div class="row">
            <app-video-list></app-video-list>
        </div>
    `
})
export class VideosComponent {

}

