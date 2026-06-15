import { Component, OnInit, signal } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipesService } from '../../services/recipes.service';
import type { RecipeType } from '../../types/recipes.type';
import { finalize, map } from 'rxjs';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { ActivatedRoute, Params } from '@angular/router';
import { StringUtil } from '../../shared/utils/string.util';

type RequestParams = {
    params: string | undefined;
    queryParams: { [key: string]: string };
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
        this.trackParams();
    }

    private getRecipes(requestParams?: RequestParams, mealType?: string): void {
        this.isLoading.set(true);

        const queryParams = {
            limit: '0',
            skip: '0',
            ...requestParams?.queryParams,
        };

        this.recipesService
            .getRecipes(queryParams, undefined, requestParams?.params)
            .pipe(
                map((preResponse) => {
                    if (mealType) {
                        return preResponse.recipes.filter((recipe) =>
                            recipe.mealType.includes(StringUtil.capitalize(mealType))
                        );
                    }

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

    private trackParams(): void {
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

        const mealType = params['meal-type'];
        const q = params['q'];
        const sortBy = params['sortBy'];
        const order = params['order'];

        const queryParams = Object.fromEntries(
            Object.entries({ q, sortBy, order }).filter(([_, value]) => value !== undefined)
        );

        if (Object.entries(queryParams).length || mealType) {
            const requestParams: RequestParams = {
                params: '/search',
                queryParams,
            };

            this.getRecipes(requestParams, mealType);
        }
    }
}
