import { map, Observable } from "rxjs";
import { UserModel } from "../../../db/user.model";
import { ProtectedService } from "./protectedService.service";
import { Injectable } from "@angular/core";

@Injectable()
export class UsersService extends ProtectedService {
    createUser(user: UserModel): Observable<UserModel> {
        return this.post('users', user);
    }

    getUsers(): Observable<UserModel[]> {
        return this.get('users').pipe(
            map((data: any) => {
                return data.results
            })
        );
    }

    getUserById(id: string): Observable<UserModel> {
        return this.get('users/' + id);
    }

    getUserByUsername(username: string): Observable<UserModel> {
        return this.get('users?username=' + username);
    }
    
    deleteUser(id: string): Observable<any> {
        return this.delete('users/' + id);
    }
}