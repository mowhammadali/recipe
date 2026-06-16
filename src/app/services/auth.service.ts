import { Injectable } from '@angular/core';
import { ApiService } from '../core/dummy-api.service';
import type { UserDataType, LoginResponseType } from '../types/auth.type';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private apiService: ApiService) {}

    public loginUser(userData: UserDataType) {
        return this.apiService.post<LoginResponseType>('/auth/login', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
