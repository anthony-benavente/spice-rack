import { Injectable } from "@angular/core";
import { UserModel } from "../../../db/user.model";

@Injectable()
export class SessionService {

    user?: UserModel;

}