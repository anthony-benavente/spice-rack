import { Injectable } from "@angular/core";
import { UserModel } from "../../../db/user.model";
import { SessionStorageService } from "../../util/storage.service";

const USER_SESSION_KEY = 'userSession';

@Injectable()
export class SessionService {

    private _user?: UserModel;
    public get user(): UserModel|undefined {
        return this._user;
    }
    public set user(user: UserModel) {
        this._user = user;
        this.storageService.setItem(USER_SESSION_KEY, JSON.stringify(user));
    }

    constructor(
        private storageService: SessionStorageService
    ) { 
        let userJson = storageService.storage.getItem(USER_SESSION_KEY);
        if (userJson) {
            this.user = JSON.parse(userJson);
        }
    }

    logout() {
        this._user = undefined;
        this.storageService.removeItem(USER_SESSION_KEY);
    }
}