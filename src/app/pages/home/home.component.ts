import { Component, OnInit, signal } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { RecipeCarouselComponent } from '../../components/recipe-carousel/recipe-carousel.component';
import { finalize, map } from 'rxjs';
import { type RecipeType } from '../../types/recipes.type';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [RecipeCarouselComponent, SkeletonComponent, NgOptimizedImage, ButtonComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
    constructor(
        private recipesService: RecipesService,
        private router: Router
    ) {}

    public mostPopularRecipesLoading = signal<boolean>(true);
    public dessertLoading = signal<boolean>(true);
    public mostPopularRecipesData = signal<RecipeType[]>([]);
    public dessertData = signal<RecipeType[]>([]);

    ngOnInit(): void {
        this.getMostPopularRecipes();
        this.getSnackRecipes();
    }

    private getMostPopularRecipes(): void {
        const params = {
            sortBy: 'rating',
            order: 'desc',
            limit: '10',
        };

        this.recipesService
            .getRecipes(params)
            .pipe(
                map((preResponse) => {
                    return preResponse.recipes;
                }),
                finalize(() => {
                    this.mostPopularRecipesLoading.set(false);
                })
            )
            .subscribe({
                next: (response) => {
                    this.mostPopularRecipesData.set(response);
                },
                error: (error) => {
                    console.log(error);
                },
            });
    }

    private getSnackRecipes(): void {
        this.recipesService
            .getRecipes(undefined, undefined, '/meal-type/dessert')
            .pipe(
                map((preResponse) => {
                    return preResponse.recipes;
                }),
                finalize(() => {
                    this.dessertLoading.set(false);
                })
            )
            .subscribe({
                next: (response) => {
                    this.dessertData.set(response);
                },
                error: (error) => {
                    console.log(error);
                },
            });
    }

    public discoverMoreRecipes(): void {
        this.router.navigate(['/recipes']);
    }
}
