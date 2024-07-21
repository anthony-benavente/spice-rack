import { Injectable } from "@angular/core";

@Injectable()
export class JwtService {

    // jwt service uses session storage by default
    isSessionStorage: boolean = true;

    storage!: Storage;

    constructor() {
        this.setStorage();
    }

    getRawJwt(): string|null {
        return this.storage.getItem('jwt');
    }

    setJwt(jwt: string) {
        this.storage.setItem('jwt', jwt);
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