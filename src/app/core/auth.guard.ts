import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    return auth.isAuthenticated$.pipe(
        map((isAuth) => {
            if (isAuth) return true;

            router.navigate(['/']);
            return false;
        })
    );
};
