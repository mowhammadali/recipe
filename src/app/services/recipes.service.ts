import { Injectable } from '@angular/core';
import { ApiService } from '../core/dummy-api.service';
import { type KeyValueType } from '../types/common.type';

@Injectable({
    providedIn: 'root',
})
export class RecipesService {
    constructor(private api: ApiService) {}

    public getRecipes(params?: KeyValueType, headers?: KeyValueType) {
        return this.api.get('/recipes', {
            headers,
            params,
        });
    }
}
