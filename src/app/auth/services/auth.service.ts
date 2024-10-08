import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment";
import { UserModel } from "../../../db/user.model";
import { EMPTY, map, Observable, tap } from "rxjs";
import { JwtService } from "./jwt.service";
import { IToken } from "../token";
import { SessionService } from "./session.service";
import { SessionStorageService } from "../../util/storage.service";

@Injectable()
export class AuthService {

    constructor(
        private http: HttpClient,
        private jwtService: JwtService,
        private sessionService: SessionService,
        private storageService: SessionStorageService
    ) { }

    saveJwt(results: Observable<IAuthLoginResults>): Observable<IAuthLoginResults> {
        return results.pipe(map(data => {
            this.jwtService.setJwt(data.tokens)
            return data;
        }));
    }

    login(username: string, password: string, rememberMe: boolean = true): Observable<IAuthLoginResults> {
        this.storageService.setUseSessionStorage(!rememberMe);
        return this.saveJwt(this.http.post<IAuthLoginResults>(`${environment.baseUrl}/auth/login`, {
            email: username, 
            password: password
        })).pipe(
            tap((data) => {
                this.sessionService.user = data.user;
            })
        );
    }

    register(registerData: {
        email: string,
        password: string,
        name: string,
        username: string
    }): Observable<IAuthLoginResults> {
        return this.http.post<IAuthLoginResults>(`${environment.baseUrl}/auth/register`, registerData);
    }

    logout(refreshToken?: string): Observable<any> {
        this.jwtService.logout();
        this.sessionService.logout();
        if (!refreshToken) {
            return EMPTY;
        }
        return this.http.post(`${environment.baseUrl}/auth/logout`, { refreshToken });
    }

    refreshTokens(): Observable<{ access: IToken, refresh: IToken }> {
        return this.http.post<{ access: IToken, refresh: IToken }>(`${environment.baseUrl}/auth/refresh-tokens`, {
            refreshToken: this.jwtService.getRefreshToken()?.token
        }).pipe(
            tap(data => { this.jwtService.setJwt(data) })
        );
    }
}

interface IAuthLoginResults {
    user: UserModel;
    tokens: {
        access: IToken,
        refresh: IToken
    }; 
}