import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-navbar',
    imports: [IconComponent, RouterLink, RouterLinkActive],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
    constructor(private authService: AuthService) {}

    public authenticated = signal<boolean>(false);
    private authSubscription: Subscription;

    public ngOnInit(): void {
        this.trackAuthentication();
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
