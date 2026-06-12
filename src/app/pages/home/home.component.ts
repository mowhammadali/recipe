import { Component } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';

@Component({
    selector: 'app-home',
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    constructor(private recipesService: RecipesService) {}
}
