import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { VideoComponent } from "./videos/video.component";
import { VideosComponent } from "./videos/videos.component";
import { VideoListComponent } from "./videos/video-list.component";
import { VideoInputComponent } from "./videos/video-input.component";
import { AuthenticatedCanActivateRoutes } from "./authenticated.CanActivate";
import { PlayerComponent } from "./player/player.component";
import { PayedCanActivateRoutes } from "./payed.CanActivate";
import {PaymentComponent} from "./payment/payment.component";

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
        VideoInputComponent,
        PlayerComponent,
        PaymentComponent
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
        AuthenticatedCanActivateRoutes,
        PayedCanActivateRoutes
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }