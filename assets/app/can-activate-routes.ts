import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth/auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class CanActivateRoutes implements CanActivate{

    isLogged: boolean;

    constructor(public auth: AuthService){ }

    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):Observable<boolean>|boolean {

        this.isLogged = this.auth.isLoggedIn();
        return this.isLogged;

    }

}
