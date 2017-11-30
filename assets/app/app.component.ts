import { Component } from '@angular/core';
import {VideoService} from "./videos/video.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers:[VideoService]
})
export class AppComponent {

}