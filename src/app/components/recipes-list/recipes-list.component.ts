import { Component, OnInit, signal } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipesService } from '../../services/recipes.service';
import type { RecipeType } from '../../types/recipes.type';
import { finalize, map } from 'rxjs';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';

@Component({
    selector: 'app-recipes-list',
    imports: [RecipeCardComponent, SkeletonComponent],
    templateUrl: './recipes-list.component.html',
    styleUrl: './recipes-list.component.css',
})
export class RecipesListComponent implements OnInit {
    constructor(private recipesService: RecipesService) {}

    public recipes = signal<RecipeType[]>([]);
    public isLoading = signal<boolean>(true);

    public ngOnInit(): void {
        this.getRecipes();
    }

    private getRecipes(): void {
        this.recipesService
            .getRecipes()
            .pipe(
                map((preResponse) => {
                    return preResponse.recipes;
                }),
                finalize(() => {
                    this.isLoading.set(false);
                })
            )
            .subscribe({
                next: (response) => {
                    this.recipes.set(response);
                },
            });
    }
}
