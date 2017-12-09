import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth/auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class PayedCanActivateRoutes implements CanActivate {

    isLogged: boolean;

    constructor(public auth: AuthService, public router: Router){ }

    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):Observable<boolean>|boolean {

        this.hasPayed = this.auth.hasPayed();
        if (this.hasPayed === true || this.hasPayed === "true") {
            return true;
        }
        else {
            this.router.navigate(['/videos']);
        }
        return false;

    }

}
