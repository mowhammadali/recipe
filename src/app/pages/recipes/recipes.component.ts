import { Component } from '@angular/core';
import { RecipesControlsComponent } from '../../components/recipes-controls/recipes-controls.component';

@Component({
    selector: 'app-recipes',
    imports: [RecipesControlsComponent],
    templateUrl: './recipes.component.html',
    styleUrl: './recipes.component.css',
})
export class RecipesComponent {}
