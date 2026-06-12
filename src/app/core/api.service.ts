import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private readonly baseUrl: string = 'https://dummyjson.com';

    constructor(private http: HttpClient) {}

    public get<T>(url: string) {
        return this.http.get<T>(`${this.baseUrl}${url}`);
    }

    public post<T, U>(url: string, body: U) {
        return this.http.post(`${this.baseUrl}${url}`, body);
    }

    put<T>(url: string, body: any) {
        return this.http.put<T>(`${this.baseUrl}${url}`, body);
    }

    delete<T>(url: string) {
        return this.http.delete<T>(`${this.baseUrl}${url}`);
    }
}
