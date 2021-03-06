import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuardService implements CanActivate {
    constructor(private auth: AuthenticationService, private router: Router) {}

    public canActivate() {
        if (!this.auth.isLoggedIn()) {
            this.router.navigate(["login"]);
            return false;
        }
        return true;
    }
}


@Injectable({
    providedIn: "root",
})
export class AdminGuardService implements CanActivate {
    constructor(private auth: AuthenticationService, private router: Router) {}

    public canActivate() {
        if (!this.auth.isAdmin()) {
            this.auth.logout();
            this.router.navigate(["login"]);
            return false;
        }
        return true;
    }
}