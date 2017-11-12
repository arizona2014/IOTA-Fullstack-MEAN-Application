import { Component } from '@angular/core';
import { MessageService } from "./messages/messages.service";


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers:[MessageService]
})
export class AppComponent {

}