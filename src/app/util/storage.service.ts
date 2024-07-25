import { Injectable } from "@angular/core";

const STORAGE_KEY = 'USE_SESSION_STORAGE';
const TRUE_VALUE = 'TRUE';

@Injectable()
export class SessionStorageService {


    private _storage!: Storage;
    public get storage(): Storage {
        return this._storage;
    }

    constructor() {
        if (localStorage.getItem(STORAGE_KEY) == TRUE_VALUE) {
            this._storage = sessionStorage;
        } else {
            this._storage = localStorage;
        }
    }

    setUseSessionStorage(val: boolean) {
        if (val) {
            localStorage.setItem(STORAGE_KEY, TRUE_VALUE);
            this._storage = sessionStorage;
        } else {
            localStorage.removeItem(STORAGE_KEY);
            this._storage = localStorage;
        }
    }

    removeItem(key: string) {
        this.storage.removeItem(key);
    }

    setItem(key: string, value: string) {
        this.storage.setItem(key, value);
    }
    
    getItem(key: string): string|null {
        return this.storage.getItem(key);
    }

}