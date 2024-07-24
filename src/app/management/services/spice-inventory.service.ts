import { Injectable } from "@angular/core";
import { ProtectedService } from "./protectedService.service";
import { Observable } from "rxjs";
import { SpiceModel } from "../../../db/spice.model";
import { SessionService } from "../../auth/services/session.service";
import { HttpClient } from "@angular/common/http";

export interface ISpiceInventory {
    userId: string;
    spice: SpiceModel;
}

@Injectable()
export class SpiceInventoryService extends ProtectedService {

    constructor(
        protected override http: HttpClient,
        private sessionService: SessionService,
    ) { super(http); }

    getSpiceInventory(userId?: string): Observable<ISpiceInventory[]> {
        if (userId == null) {
            // get inventory of logged in user
            userId = this.sessionService.user?.id;
        } 

        return this.get(`users/${userId}/inventory`);
    }

    addSpiceToInventory(data: { spice: string, amount: number }, userId?: string): Observable<unknown> {
        if (userId == null) {
            userId = this.sessionService.user?.id;
        }
        return this.post(`users/${userId}/inventory`, data);
    }
}