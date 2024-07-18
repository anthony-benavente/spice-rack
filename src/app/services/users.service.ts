import { Observable } from "rxjs";
import { UserModel } from "../../db/user.model";
import { ProtectedService } from "./protectedService.service";

export class UsersService extends ProtectedService {
    addUser(user: UserModel): Observable<UserModel> {
        return this.post('users', user);
    }

    getUsers(): Observable<UserModel[]> {
        return this.get('users');
    }

    getUserById(id: string): Observable<UserModel> {
        return this.get('users/' + id);
    }

    getUserByUsername(username: string): Observable<UserModel> {
        return this.get('users?username=' + username);
    }
}