import { Injectable } from "@angular/core";
import { IToken } from "../token";
import { SessionStorageService } from "../../util/storage.service";

@Injectable()
export class JwtService {

    readonly storageKeys = {
        access: 'access',
        accessExp: 'accessExp',
        refresh: 'refresh',
        refreshExp: 'refreshExp',
    }

    constructor(
        private storageService: SessionStorageService
    ) { }

    getAccessToken(): IToken|null {
        let tok = this.storageService.getItem(this.storageKeys.access);
        let exp = this.storageService.getItem(this.storageKeys.accessExp);
        if (!tok || !exp) return null;
        else {
            return {
                token: tok,
                expires: exp
            }
        }
        
    }

    getRefreshToken(): IToken|null {
        let tok = this.storageService.getItem(this.storageKeys.refresh);
        let exp = this.storageService.getItem(this.storageKeys.refreshExp);
        if (!tok || !exp) return null;
        else {
            return {
                token: tok,
                expires: exp
            }
        }
    }

    setJwt(jwt: { access: IToken, refresh: IToken }) {
        this.storageService.setItem(this.storageKeys.access, jwt.access.token);
        this.storageService.setItem(this.storageKeys.accessExp, jwt.access.expires);
        this.storageService.setItem(this.storageKeys.refresh, jwt.refresh.token);
        this.storageService.setItem(this.storageKeys.refreshExp, jwt.refresh.expires);
    }

    logout() {
        Object.keys(this.storageKeys).forEach(key => {
            this.storageService.removeItem(key);
        });
    }

}