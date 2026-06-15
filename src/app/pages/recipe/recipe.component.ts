import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';
import { finalize } from 'rxjs';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { type RecipeType } from '../../types/recipes.type';

@Component({
    selector: 'app-recipe',
    imports: [SkeletonComponent, IconComponent, RouterLink],
    templateUrl: './recipe.component.html',
    styleUrl: './recipe.component.css',
})
export class RecipeComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private recipesService: RecipesService
    ) {}

    public isLoading = signal<boolean>(true);
    public recipe = signal<RecipeType>({} as RecipeType);

    public ngOnInit(): void {
        this.trackParams();
    }

    private getRecipe(id: string): void {
        this.isLoading.set(true);

        this.recipesService
            .getRecipe(id)
            .pipe(
                finalize(() => {
                    this.isLoading.set(false);
                })
            )
            .subscribe({
                next: (response) => {
                    this.recipe.set(response);
                    console.log(response);
                },
            });
    }

    private trackParams(): void {
        this.route.params.subscribe((params: Params) => {
            this.getRecipe(params['id']);
        });
    }
}
