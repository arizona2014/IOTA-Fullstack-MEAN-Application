import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth/auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthenticatedCanActivateRoutes implements CanActivate {

    isLogged: boolean;

    constructor(public auth: AuthService, public router: Router){ }

    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):Observable<boolean>|boolean {

        this.isLogged = this.auth.isLoggedIn();
        if (this.isLogged) {
            return true;
        }
        else {
            this.router.navigate(['/auth/signin']);
        }
        return false;

    }

}
