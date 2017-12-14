import { Routes, RouterModule } from "@angular/router";
import { AuthenticationComponent } from "./auth/authentication.component";
import { AUTH_ROUTES } from "./auth/auth.routes";
import { VideosComponent } from "./videos/videos.component";
import { AuthenticatedCanActivateRoutes } from "./authenticated.CanActivate";
import { PlayerComponent } from "./player/player.component";
import { PayedCanActivateRoutes } from "./payed.CanActivate";

const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/videos',
        pathMatch: 'full'
    },
    {
        path: 'videos',
        component: VideosComponent,
        canActivate: [AuthenticatedCanActivateRoutes]
    },
    {
        path: 'auth',
        component: AuthenticationComponent,
        children: AUTH_ROUTES
    },
    {
        path: 'player',
        component: PlayerComponent,
        canActivate: [AuthenticatedCanActivateRoutes, PayedCanActivateRoutes]
    },
    {
        path: 'payment',
        component: PaymentComponent,
        canActivate: [AuthenticatedCanActivateRoutes]
    }
];

export const routing = RouterModule.forRoot(APP_ROUTES);