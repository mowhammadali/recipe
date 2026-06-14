import { Component } from '@angular/core';
import { RecipesControlsComponent } from '../../components/recipes-controls/recipes-controls.component';
import { MealTypeComponent } from '../../components/meal-type/meal-type.component';

@Component({
    selector: 'app-recipes',
    imports: [RecipesControlsComponent, MealTypeComponent],
    templateUrl: './recipes.component.html',
    styleUrl: './recipes.component.css',
})
export class RecipesComponent {}
