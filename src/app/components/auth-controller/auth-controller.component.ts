import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth-controller',
    imports: [ButtonComponent, IconComponent],
    templateUrl: './auth-controller.component.html',
    styleUrl: './auth-controller.component.css',
})
export class AuthControllerComponent implements OnInit, OnDestroy {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    public authenticated = signal<boolean>(false);
    private authSubscription: Subscription;

    public ngOnInit(): void {
        this.trackAuthentication();
    }

    public navigateToLogin(): void {
        this.router.navigate(['/login']);
    }

    public trackAuthentication(): void {
        this.authSubscription = this.authService.isAuthenticated$.subscribe((isSignIn) => {
            this.authenticated.set(isSignIn);
        });
    }

    public ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }
}
