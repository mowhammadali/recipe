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
        private toastr: ToastrService
    ) {}

    private authenticated = signal<boolean>(false);
    private authSubscription: Subscription;

    @Input() recipe = {} as RecipeType;

    public ngOnInit(): void {
        this.authSubscription = this.authService.isAuthenticated$.subscribe((isSignIn) => {
            this.authenticated.set(isSignIn);
        });
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

    public ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }
}
