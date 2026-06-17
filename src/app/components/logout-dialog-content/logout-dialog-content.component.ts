import { Component } from '@angular/core';
import { DialogRefService } from '../../services/dialog-ref.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-logout-dialog-content',
    imports: [ButtonComponent],
    templateUrl: './logout-dialog-content.component.html',
    styleUrl: './logout-dialog-content.component.css',
})
export class LogoutDialogContentComponent {
    constructor(
        private dialogRef: DialogRefService,
        private authService: AuthService,
        private router: Router
    ) {}

    public cancel(): void {
        this.dialogRef.close();
    }

    public logout(): void {
        this.authService.logout();
        this.router.navigate(['login']);
    }
}
