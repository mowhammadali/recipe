import { Component } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
    selector: 'app-recipes-list',
    imports: [RecipeCardComponent],
    templateUrl: './recipes-list.component.html',
    styleUrl: './recipes-list.component.css',
})
export class RecipesListComponent {}
