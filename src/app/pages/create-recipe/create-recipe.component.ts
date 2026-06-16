import { Component } from '@angular/core';
import { AuthControllerComponent } from '../../components/auth-controller/auth-controller.component';

@Component({
    selector: 'app-create-recipe',
    imports: [AuthControllerComponent],
    templateUrl: './create-recipe.component.html',
    styleUrl: './create-recipe.component.css',
})
export class CreateRecipeComponent {}
