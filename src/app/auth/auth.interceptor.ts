import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from "rxjs";
import { environment } from "../../environment";
import { inject } from "@angular/core";
import { JwtService } from "./services/jwt.service";
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";

let isRefreshing = false;
let refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    if (req.url.startsWith(`${environment.baseUrl}/auth/`)) {
        return next(req);   
    }

    const jwtService = inject(JwtService);
    const authService = inject(AuthService);
    const router = inject(Router);
    const deps = { jwtService, authService, router };
    req = addTokenHeader(req, jwtService.getAccessToken()?.token!);

    return next(req).pipe(
        catchError(err => {
            console.error('Failed to perform request:', err);

            if (err instanceof HttpErrorResponse && err.status === 401) {
                // refresh token
                return refreshToken(req, next, deps);
            }

            return throwError(() => err);
        })
    )
}

function refreshToken(req: HttpRequest<unknown>, next: HttpHandlerFn, deps: {
    jwtService: JwtService, 
    authService: AuthService,
    router: Router 
}): Observable<HttpEvent<unknown>> {
    if (isRefreshing) {
        return refreshTokenSubject.pipe(
            filter((token, _) => token !== null),
            take(1),
            switchMap(token => next(addTokenHeader(req, token)))
        )
    }
    
    isRefreshing = true;
    refreshTokenSubject.next(null);

    const token = deps.jwtService.getRefreshToken();
    // refresh token out of date. route to login screen
    if (new Date(Date.parse(token?.expires!)) < new Date()) {
        console.error('Refresh token is expired! Please log in again.');
        deps.router.navigate(['/login']);
    }
    return deps.authService.refreshTokens().pipe(
        switchMap(tok => {
            isRefreshing = false;
            refreshTokenSubject.next(tok.access.token);
            return next(addTokenHeader(req, tok.access.token));
        }),
        catchError(err => {
            isRefreshing = false;
            deps.jwtService.reset();
            deps.router.navigate(['/login']);
            return throwError(() => err);  
        })
    );
}

function addTokenHeader(req: HttpRequest<unknown>, token: string) {
    return req.clone({
        setHeaders: {
            Authorization: 'Bearer ' + token
        }
    });
}