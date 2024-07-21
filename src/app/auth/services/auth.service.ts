import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment";
import { UserModel } from "../../../db/user.model";
import { EMPTY, map, Observable } from "rxjs";
import { JwtService } from "./jwt.service";
import { IToken } from "../token";

@Injectable()
export class AuthService {

    constructor(
        private http: HttpClient,
        private jwtService: JwtService
    ) { }

    saveJwt(results: Observable<IAuthLoginResults>): Observable<IAuthLoginResults> {
        return results.pipe(map(data => {
            this.jwtService.setJwt(data.tokens)
            return data;
        }));
    }

    login(username: string, password: string): Observable<IAuthLoginResults> {
        return this.saveJwt(this.http.post<IAuthLoginResults>(`${environment.baseUrl}/auth/login`, {
            email: username, 
            password: password
        }));
    }

    register(registerData: {
        email: string,
        password: string,
        name: string,
        username: string
    }): Observable<IAuthLoginResults> {
        return this.http.post<IAuthLoginResults>(`${environment.baseUrl}/auth/register`, registerData);
    }

    logout(refreshToken: string|null): Observable<any> {
        if (!refreshToken) {
            return EMPTY;
        }
        return this.http.post(`${environment.baseUrl}/auth/logout`, { refreshToken });
    }
}

interface IAuthLoginResults {
    user: UserModel;
    tokens: {
        access: IToken,
        refresh: IToken
    }; 
}