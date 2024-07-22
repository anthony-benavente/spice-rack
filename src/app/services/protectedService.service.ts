import { Observable } from "rxjs";
import { environment } from "../../environment";
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtService } from "../auth/services/jwt.service";

@Injectable()
export class ProtectedService {
    constructor (
        protected http: HttpClient,
        private tokenService: JwtService
    ) { }

    get<T>(path: string, params?: any): Observable<T> {
        let httpParams = new HttpParams({ fromObject: params });
        const token = this.tokenService.getAccessToken();
        return this.http.get<T>(`${environment.baseUrl}/${path}`, {
            params: httpParams,
            headers: this.getAuthHeaders()
        });
    }

    post<T>(path: string, data: any): Observable<T> {
        return this.http.post<T>(`${environment.baseUrl}/${path}`, data, {
            headers: this.getAuthHeaders()
        });
    }

    delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(`${environment.baseUrl}/${path}`, {
            headers: this.getAuthHeaders()
        })
    }

    getAuthHeaders() {
        return new HttpHeaders().set('Authorization', 
            'Bearer ' + this.tokenService.getAccessToken());
    }

}