import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { type HttpOptionsType } from '../types/api.type';

@Injectable({
    providedIn: 'root',
})
export class MockApiService {
    private readonly baseUrl: string = 'https://6606fe26be53febb857efe71.mockapi.io/recipes/v1';

    constructor(private http: HttpClient) {}

    public get<T>(url: string, options?: HttpOptionsType) {
        return this.http.get<T>(`${this.baseUrl}${url}`, options);
    }

    public post<T>(url: string, body: any, options?: HttpOptionsType) {
        return this.http.post<T>(`${this.baseUrl}${url}`, body, options);
    }

    put<T>(url: string, body: any, options?: HttpOptionsType) {
        return this.http.put<T>(`${this.baseUrl}${url}`, body, options);
    }

    delete<T>(url: string, options?: HttpOptionsType) {
        return this.http.delete<T>(`${this.baseUrl}${url}`, options);
    }
}
