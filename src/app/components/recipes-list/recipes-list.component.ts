import { Component, OnInit, signal } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipesService } from '../../services/recipes.service';
import type { RecipeType } from '../../types/recipes.type';
import { finalize, map } from 'rxjs';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { ActivatedRoute, Params } from '@angular/router';

type SearchParams = {
    params: string;
    queryParams: { q: string };
};

@Component({
    selector: 'app-recipes-list',
    imports: [RecipeCardComponent, SkeletonComponent],
    templateUrl: './recipes-list.component.html',
    styleUrl: './recipes-list.component.css',
})
export class RecipesListComponent implements OnInit {
    constructor(
        private recipesService: RecipesService,
        private route: ActivatedRoute
    ) {}

    public recipes = signal<RecipeType[]>([]);
    public isLoading = signal<boolean>(true);

    public ngOnInit(): void {
        this.trackRoutes();
    }

    private getRecipes(searchParams?: SearchParams): void {
        this.isLoading.set(true);

        this.recipesService
            .getRecipes(searchParams?.queryParams, undefined, searchParams?.params)
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

    private trackRoutes(): void {
        this.route.queryParams.subscribe({
            next: (params: Params) => {
                this.handleGetRecipesByParams(params);
            },
        });
    }

    private handleGetRecipesByParams(params: Params): void {
        if (Object.keys(params).length == 0) {
            this.getRecipes();
            return;
        }

        const q = params['q'];

        if (q) {
            const searchParams: SearchParams = {
                params: '/search',
                queryParams: { q },
            };

            this.getRecipes(searchParams);
            return;
        }
    }
}
