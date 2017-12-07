import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MessageComponent } from "./messages/message.component";
import { MessageListComponent } from "./messages/message-list.component";
import { MessageInputComponent } from "./messages/message-input.component";
import { MessagesComponent } from "./messages/messages.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import { LogoutComponent } from "./auth/logout.component";
import { SigninComponent } from "./auth/signin.component";
import { SignupComponent } from "./auth/signup.component";
import { HttpModule } from "@angular/http";
import { AuthService } from "./auth/auth.service";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";
import {VideoComponent} from "./videos/video.component";
import {VideosComponent} from "./videos/videos.component";
import {VideoListComponent} from "./videos/video-list.component";
import {VideoInputComponent} from "./videos/video-input.component";
import {CanActivateRoutes} from "./can-activate-routes";

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        SigninComponent,
        SignupComponent,
        ErrorComponent,
        VideoComponent,
        VideosComponent,
        VideoListComponent,
        VideoInputComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule
    ],
    providers: [
        AuthService,
        ErrorService,
        CanActivateRoutes
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }