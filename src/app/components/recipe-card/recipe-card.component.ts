import { Component, Input, OnInit, signal } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { MarkRecipeType, type RecipeType } from '../../types/recipes.type';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RecipesService } from '../../services/recipes.service';
import { MarkedRecipesService } from '../../services/marked-recipes.service';

@Component({
    selector: 'app-recipe-card',
    imports: [IconComponent, TruncatePipe, RouterLink],
    templateUrl: './recipe-card.component.html',
    styleUrl: './recipe-card.component.css',
})
export class RecipeCardComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private recipesService: RecipesService,
        private toastr: ToastrService,
        private markedRecipesService: MarkedRecipesService
    ) {}

    private authenticated = signal<boolean>(false);
    private authSubscription: Subscription;
    public markedRecipes = signal<MarkRecipeType[]>([]);
    private markedRecipesSubject: Subscription;

    @Input() recipe = {} as RecipeType;

    public ngOnInit(): void {
        this.authSubscription = this.authService.isAuthenticated$.subscribe((isSignIn) => {
            this.authenticated.set(isSignIn);
        });

        this.trackMarkedRecipes();
    }

    public navigateToRecipeDetails(id: number): void {
        this.router.navigate(['.', id], { relativeTo: this.route });
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
