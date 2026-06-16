import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export function initializeAuth() {
    const authService = inject(AuthService);
    return firstValueFrom(authService.initAuth());
}
