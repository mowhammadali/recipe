import { Component, signal } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-login',
    imports: [IconComponent, ButtonComponent, ReactiveFormsModule, NgIf],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    public isSubmitted = signal<boolean>(false);
    public loginFormGroup: FormGroup;

    constructor(fb: FormBuilder) {
        this.loginFormGroup = fb.group({
            username: ['emilys', Validators.required],
            password: ['emilyspass', Validators.required],
        });
    }

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

        const userData = this.loginFormGroup.value;
    }
}
