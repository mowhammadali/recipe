import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { type AuthType } from '../../types/auth.type';
import { finalize, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { LogoutDialogContentComponent } from '../../components/logout-dialog-content/logout-dialog-content.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';

@Component({
    selector: 'app-profile',
    imports: [IconComponent, DialogComponent, LogoutDialogContentComponent, SkeletonComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    public isLoading = signal<boolean>(true);
    public userInfo = signal({} as AuthType);
    public isDialogOpen = signal<boolean>(false);

    public ngOnInit(): void {
        this.getUserInfo();
    }

    private getUserInfo() {
        this.isLoading.set(true);

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
                }),
                finalize(() => {
                    this.isLoading.set(false);
                })
            )
            .subscribe({
                next: (response) => {
                    this.userInfo.set(response);
                },
            });
    }

    public navigation(path: string) {
        this.router.navigate([path]);
    }

    public openLogoutDialog(): void {
        this.isDialogOpen.set(true);
    }

    private logout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }
}
