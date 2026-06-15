import { Injectable } from '@angular/core';
import { ApiService } from '../core/dummy-api.service';
import { type KeyValueType } from '../types/common.type';
import type { RecipesResponseType, RecipeType } from '../types/recipes.type';

@Injectable({
    providedIn: 'root',
})
export class RecipesService {
    constructor(private api: ApiService) {}

    public getRecipes(params?: KeyValueType, headers?: KeyValueType, url: string = '') {
        return this.api.get<RecipesResponseType>('/recipes' + url, {
            headers,
            params,
        });
    }

    public getRecipe(id: string) {
        return this.api.get<RecipeType>('/recipes/' + id);
    }
}
