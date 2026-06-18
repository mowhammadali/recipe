import { Injectable } from '@angular/core';
import { ApiService } from '../core/dummy-api.service';
import { type KeyValueType } from '../types/common.type';
import type { RecipesResponseType, RecipeType, MarkRecipeType } from '../types/recipes.type';
import { MockApiService } from '../core/mock-api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RecipesService {
    constructor(
        private api: ApiService,
        private mockApi: MockApiService
    ) {}

    public getRecipes(params?: KeyValueType, headers?: KeyValueType, url: string = '') {
        return this.api.get<RecipesResponseType>('/recipes' + url, {
            headers,
            params,
        });
    }

    public getRecipe(id: string) {
        return this.api.get<RecipeType>('/recipes/' + id);
    }

    public markRecipe(recipe: MarkRecipeType): Observable<MarkRecipeType> {
        return this.mockApi.post('/saved', recipe);
    }

    public getMarkedRecipes(): Observable<MarkRecipeType[]> {
        return this.mockApi.get('/saved');
    }
}
