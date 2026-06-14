import { Component } from '@angular/core';
import { RecipesControlsComponent } from '../../components/recipes-controls/recipes-controls.component';
import { MealTypeComponent } from '../../components/meal-type/meal-type.component';
import { RecipesListComponent } from '../../components/recipes-list/recipes-list.component';

@Component({
    selector: 'app-recipes',
    imports: [RecipesControlsComponent, MealTypeComponent, RecipesListComponent],
    templateUrl: './recipes.component.html',
    styleUrl: './recipes.component.css',
})
export class RecipesComponent {}
