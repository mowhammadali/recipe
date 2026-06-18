import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { RecipesService } from './recipes.service';
import type { MarkRecipeType } from '../types/recipes.type';

@Injectable({
    providedIn: 'root',
})
export class MarkedRecipesService {
    constructor(private recipesService: RecipesService) {}

    private recipesSubject = new BehaviorSubject<MarkRecipeType[]>([]);

    public recipes$ = this.recipesSubject.asObservable();

    private loaded = false;

    public loadRecipes(): Observable<MarkRecipeType[]> {
        if (this.loaded) {
            return of(this.recipesSubject.value);
        }

        return this.refreshRecipes();
    }

    public refreshRecipes(): Observable<MarkRecipeType[]> {
        return this.recipesService.getMarkedRecipes().pipe(
            tap((recipes) => {
                this.loaded = true;
                this.recipesSubject.next(recipes);
            })
        );
    }

    public get recipes(): MarkRecipeType[] {
        return this.recipesSubject.value;
    }
}
