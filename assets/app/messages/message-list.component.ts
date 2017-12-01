import { Component } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./messages.service";

@Component({
    selector: 'app-message-list',
    template: `
        <div class=".col-md-8 col-md-offset-2">
            <app-message
                    [message]="message"                    
                    *ngFor="let message of messages"
            >
            </app-message>
        </div>        
    `
})
export class MessageListComponent {

    messages: Message[];

    constructor(private messageService: MessageService){  }

    ngOnInit(){

        this.messageService.getMessages()
            .subscribe(
                (messages: Message[]) => {
                    this.messages = messages;
                }
            );

    }

}