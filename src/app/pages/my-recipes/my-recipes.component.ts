import { Component } from '@angular/core';
import { AuthControllerComponent } from '../../components/auth-controller/auth-controller.component';

@Component({
    selector: 'app-my-recipes',
    imports: [AuthControllerComponent],
    templateUrl: './my-recipes.component.html',
    styleUrl: './my-recipes.component.css',
})
export class MyRecipesComponent {}
