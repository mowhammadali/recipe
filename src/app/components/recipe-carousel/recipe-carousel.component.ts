import { Component, Input, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal, OnDestroy } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import type { RecipeType, MarkRecipeType } from '../../types/recipes.type';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RecipesService } from '../../services/recipes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MarkedRecipesService } from '../../services/marked-recipes.service';

@Component({
    selector: 'app-recipe-carousel',
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [IconComponent, NgFor, RouterLink, TruncatePipe],
    templateUrl: './recipe-carousel.component.html',
    styleUrl: './recipe-carousel.component.css',
})
export class RecipeCarouselComponent implements OnInit, OnDestroy {
    constructor(
        private authService: AuthService,
        private recipesService: RecipesService,
        private toastr: ToastrService,
        private router: Router,
        private markedRecipesService: MarkedRecipesService
    ) {}

    private authenticated = signal<boolean>(false);
    public markedRecipes = signal<MarkRecipeType[]>([]);
    private authSubscription: Subscription;
    private markedRecipesSubject: Subscription;

    @Input('carousel-title') title: string = '';
    @Input('navigation-link') navigationLink: string = '';
    @Input('recipes-data') recipes: RecipeType[] = [];
    @Input('is-fetching') isFetching: boolean = true;

    public ngOnInit(): void {
        this.authSubscription = this.authService.isAuthenticated$.subscribe((isSignIn) => {
            this.authenticated.set(isSignIn);
        });

        this.trackMarkedRecipes();
    }

    public navigateToRecipe(id: string | number): void {
        this.router.navigate(['/recipes', id]);
    }

    public saveToBookmark(recipe: RecipeType): void {
        if (!this.authenticated()) {
            this.toastr.info('Please Login first to mark this recipe');
            return;
        }

        const markedRecipe: MarkRecipeType = { ...recipe, recipeId: recipe.id };

        this.toastr.success('The recipe has marked');
        this.recipesService.markRecipe(markedRecipe).subscribe({
            error: (error: HttpErrorResponse) => {
                this.toastr.error(error.message);
            },
        });
    }

    public checkMarked(recipe: RecipeType): boolean {
        const isMarked = this.markedRecipes().some((rec) => rec.recipeId == recipe.id);
        return isMarked;
    }

    private trackMarkedRecipes(): void {
        this.markedRecipesSubject = this.markedRecipesService.recipes$.subscribe((recipes) => {
            this.markedRecipes.set(recipes);
        });
    }

    public ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
        this.markedRecipesSubject.unsubscribe();
    }
}
