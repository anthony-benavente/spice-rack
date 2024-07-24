import { Injectable } from "@angular/core";
import { IToken } from "../token";

@Injectable()
export class JwtService {

    // jwt service uses session storage by default
    isSessionStorage: boolean = true;

    storage!: Storage;

    readonly storageKeys = {
        access: 'access',
        accessExp: 'accessExp',
        refresh: 'refresh',
        refreshExp: 'refreshExp',
        isSessionStorage: 'isSessionStorage'
    }

    constructor() {
        this.setStorage();
    }

    getAccessToken(): IToken|null {
        let tok = this.storage.getItem(this.storageKeys.access);
        let exp = this.storage.getItem(this.storageKeys.accessExp);
        if (!tok || !exp) return null;
        else {
            return {
                token: tok,
                expires: exp
            }
        }
        
    }

    getRefreshToken(): IToken|null {
        let tok = this.storage.getItem(this.storageKeys.refresh);
        let exp = this.storage.getItem(this.storageKeys.refreshExp);
        if (!tok || !exp) return null;
        else {
            return {
                token: tok,
                expires: exp
            }
        }
    }

    setJwt(jwt: { access: IToken, refresh: IToken }) {
        this.storage.setItem(this.storageKeys.access, jwt.access.token);
        this.storage.setItem(this.storageKeys.accessExp, jwt.access.expires);
        this.storage.setItem(this.storageKeys.refresh, jwt.refresh.token);
        this.storage.setItem(this.storageKeys.refreshExp, jwt.refresh.expires);
    }

    setStorage(isSessionStorage?: boolean) {
        if (isSessionStorage == null) {
            // check value of sessionStorage in localStorage
            isSessionStorage = localStorage.getItem(this.storageKeys.isSessionStorage) == 'true';
        }
        this.isSessionStorage = isSessionStorage;
        this.storage = isSessionStorage ? sessionStorage : localStorage;
    }

    reset() {
        Object.keys(this.storageKeys).forEach(key => {
            this.storage.removeItem(key);
        });
    }

}