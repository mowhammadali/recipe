import { Component, signal } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserDataType } from '../../types/auth.type';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-login',
    imports: [IconComponent, ButtonComponent, ReactiveFormsModule, NgIf, MatProgressSpinnerModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    constructor(
        fb: FormBuilder,
        private authService: AuthService,
        private toastr: ToastrService
    ) {
        this.loginFormGroup = fb.group({
            username: ['emilys', Validators.required],
            password: ['emilyspass', Validators.required],
        });
    }

    public isSubmitted = signal<boolean>(false);
    public isSigning = signal<boolean>(false);
    public loginFormGroup: FormGroup;

    public isFieldInvalid(fieldName: string): boolean {
        const field = this.loginFormGroup.get(fieldName);

        return !!(field?.invalid && (field.touched || this.isSubmitted()));
    }

    public onSubmit(): void {
        this.isSubmitted.set(true);

        if (this.loginFormGroup.invalid) {
            this.loginFormGroup.markAllAsTouched();
            return;
        }

        const userData: UserDataType = {
            ...this.loginFormGroup.value,
            expiresInMins: 10,
        };

        this.loginUser(userData);
    }

    private async loginUser(data: UserDataType): Promise<void> {
        this.isSigning.set(true);

        await new Promise((res) => {
            setTimeout(() => {
                res(true);
            }, 1000);
        });

        this.authService
            .loginUser(data)
            .pipe(
                finalize(() => {
                    this.isSigning.set(false);
                })
            )
            .subscribe({
                next: (response) => {
                    this.toastr.success('Login successful. Welcome!', 'Success', {
                        positionClass: 'toast-top-right',
                    });
                },
            });
    }
}
