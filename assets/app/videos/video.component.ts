import {Component, Input} from "@angular/core";
import {Message} from "./message.model";
import {VideoService} from "./video.service";

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

    @Input() video: Message;

    constructor(private messageService: MessageService){ }

    onEdit(){
        this.messageService.editMessage(this.message);
    }

    onDelete(){
        this.messageService.deleteMessage(this.message)
            .subscribe(
                result => console.log(result)
            );
    }

    belongsToUser(){
        return localStorage.getItem('userId') == this.message.userId;
    }

}