import { Component } from '@angular/core';
import { AuthControllerComponent } from '../../components/auth-controller/auth-controller.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
    selector: 'app-create-recipe',
    imports: [AuthControllerComponent, IconComponent, ButtonComponent],
    templateUrl: './create-recipe.component.html',
    styleUrl: './create-recipe.component.css',
})
export class CreateRecipeComponent {}
