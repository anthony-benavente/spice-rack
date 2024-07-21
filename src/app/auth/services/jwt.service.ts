import { Injectable } from "@angular/core";
import { IToken } from "../token";

@Injectable()
export class JwtService {

    // jwt service uses session storage by default
    isSessionStorage: boolean = true;

    storage!: Storage;

    constructor() {
        this.setStorage();
    }

    getAccessToken(): string|null {
        return this.storage.getItem('access');
    }

    getRefreshToken(): string|null {
        return this.storage.getItem('refresh');
    }

    setJwt(jwt: { access: IToken, refresh: IToken }) {
        this.storage.setItem('access', jwt.access.token);
        this.storage.setItem('accessExpirationDate', jwt.access.expires);
        this.storage.setItem('refresh', jwt.refresh.token);
        this.storage.setItem('refreshExpirationDate', jwt.refresh.expires);
    }

    setStorage(isSessionStorage?: boolean) {
        if (isSessionStorage == null) {
            // check value of sessionStorage in localStorage
            isSessionStorage = localStorage.getItem('isSessionStorage') == 'true';
        }
        this.isSessionStorage = isSessionStorage;
        this.storage = isSessionStorage ? sessionStorage : localStorage;
    }

}