import { Component } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
    selector: 'app-login',
    imports: [IconComponent, ButtonComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {}
