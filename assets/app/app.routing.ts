import { Routes, RouterModule } from "@angular/router";
import { AuthenticationComponent } from "./auth/authentication.component";
import { AUTH_ROUTES } from "./auth/auth.routes";
import { VideosComponent } from "./videos/videos.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/videos', pathMatch: 'full' },
    { path: 'videos', component: VideosComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);