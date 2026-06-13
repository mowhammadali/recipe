import { Component } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { RecipeCarouselComponent } from '../../components/recipe-carousel/recipe-carousel.component';

@Component({
    selector: 'app-home',
    imports: [RecipeCarouselComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    constructor(private recipesService: RecipesService) {}
}
