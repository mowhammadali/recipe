import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { type AuthType } from '../../types/auth.type';
import { map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
    selector: 'app-profile',
    imports: [IconComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    public userInfo = signal({} as AuthType);

    public ngOnInit(): void {
        this.getUserInfo();
    }

    private getUserInfo() {
        this.authService
            .getUserInfo()
            .pipe(
                map((response) => {
                    if (response == null) {
                        return {} as AuthType;
                    }
                    return response;
                }),
                tap((response) => {
                    if (response == null) {
                        this.logout();
                        return;
                    }
                })
            )
            .subscribe({
                next: (response) => {
                    console.log(response);

                    this.userInfo.set(response);
                },
            });
    }

    public navigation(path: string) {
        this.router.navigate([path]);
    }

    public logout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }
}
