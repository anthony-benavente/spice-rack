import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { JwtService } from "./services/jwt.service";

@Injectable()
export class IsLoggedInGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
        private router: Router
    ) {

    }

    validJwt(jwt: string|null): boolean {
        return jwt != null
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        // verify the jwt exists and is valid
        const jwt = this.jwtService.getAccessToken();
        const canRoute = this.validJwt(jwt?.token!);
        // const canRoute = true;
        if (!canRoute) {
            this.router.navigate(['/login']);
        }
        return canRoute
    }

}