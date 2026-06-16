import { Injectable } from '@angular/core';
import { ApiService } from '../core/dummy-api.service';
import type { UserDataType, LoginResponseType, AuthType } from '../types/auth.type';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private apiService: ApiService) {}

    private userSubject = new BehaviorSubject<AuthType | null>(null);

    user$ = this.userSubject.asObservable();

    isAuthenticated$ = this.user$.pipe(map((user) => !!user));

    private tokenKey = 'accessToke';

    get token(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    private setToken(token: string) {
        localStorage.setItem(this.tokenKey, token);
    }

    private removeToken() {
        localStorage.removeItem(this.tokenKey);
    }

    public loginUser(userData: UserDataType): Observable<LoginResponseType> {
        return this.apiService
            .post<LoginResponseType>('/auth/login', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .pipe(
                tap((response) => {
                    this.setToken(response.accessToken);
                    this.userSubject.next(response);
                })
            );
    }

    public getUserInfo(): Observable<AuthType | null> {
        if (!this.token) {
            return of(null);
        }

        return this.apiService.get<AuthType>('/auth/me').pipe(
            tap((response) => {
                this.userSubject.next(response);
            }),
            catchError(() => {
                return of(null);
            })
        );
    }

    initAuth(): Observable<boolean> {
        return this.getUserInfo().pipe(map((user) => !!user));
    }

    logout() {
        this.removeToken();
        this.userSubject.next(null);
    }
}
