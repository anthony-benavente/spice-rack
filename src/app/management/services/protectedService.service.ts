import { Observable } from "rxjs";
import { environment } from "../../../environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ProtectedService {
    constructor (
        protected http: HttpClient
    ) { }

    protected  get<T>(path: string, params?: any): Observable<T> {
        let httpParams = new HttpParams({ fromObject: params });
        return this.http.get<T>(`${environment.baseUrl}/${path}`, {
            params: httpParams,
        })
    }

    protected post<T>(path: string, data: any): Observable<T> {
        return this.http.post<T>(`${environment.baseUrl}/${path}`, data);
    }

    protected delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(`${environment.baseUrl}/${path}`)
    }


}