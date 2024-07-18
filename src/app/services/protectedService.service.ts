import { Observable } from "rxjs";
import { environment } from "../../environment";
import { HttpClient, HttpEvent, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ProtectedService {
    constructor (
        protected http: HttpClient
    ) { }

    get<T>(path: string, params?: any): Observable<T> {
        let httpParams = new HttpParams({ fromObject: params });
        return this.http.get<T>(`${environment.baseUrl}/${path}`, {
            params: httpParams
        });
    }

    post<T>(path: string, data: any): Observable<T> {
        return this.http.post<T>(`${environment.baseUrl}/${path}`, data);
    }

}