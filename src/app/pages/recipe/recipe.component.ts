import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';
import { finalize, Subscription } from 'rxjs';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { MarkRecipeType, type RecipeType } from '../../types/recipes.type';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { IngredientsComponent } from '../../components/ingredients/ingredients.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { BottomSheetComponent } from '../../shared/components/bottom-sheet/bottom-sheet.component';
import { InstructionsComponent } from '../../components/instructions/instructions.component';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MarkedRecipesService } from '../../services/marked-recipes.service';

@Component({
    selector: 'app-recipe',
    imports: [
        SkeletonComponent,
        IconComponent,
        InfoBoxComponent,
        IngredientsComponent,
        ButtonComponent,
        BottomSheetComponent,
        InstructionsComponent,
    ],
    templateUrl: './recipe.component.html',
    styleUrl: './recipe.component.css',
})
export class RecipeComponent implements OnInit, OnDestroy {
    constructor(
        private route: ActivatedRoute,
        private recipesService: RecipesService,
        private authService: AuthService,
        private toastr: ToastrService,
        private location: Location,
        private markedRecipesService: MarkedRecipesService
    ) {}

    public isLoading = signal<boolean>(true);
    public recipe = signal<RecipeType>({} as RecipeType);
    public sheetVisibility = signal<boolean>(false);
    public authenticated = signal<boolean>(false);
    private authSubscription: Subscription;
    private markedRecipesSubject: Subscription;
    public markedRecipes = signal<MarkRecipeType[]>([]);
    private refreshRecipesSubject: Subscription;

    public ngOnInit(): void {
        this.trackParams();
        this.trackAuthentication();
        this.trackMarkedRecipes();
    }

    private getRecipe(id: string): void {
        this.isLoading.set(true);

        this.recipesService
            .getRecipe(id)
            .pipe(
                finalize(() => {
                    this.isLoading.set(false);
                })
            )
            .subscribe({
                next: (response) => {
                    this.recipe.set(response);
                },
            });
    }

    private trackParams(): void {
        this.route.params.subscribe((params: Params) => {
            this.getRecipe(params['id']);
        });
    }

    private trackAuthentication(): void {
        this.authSubscription = this.authService.isAuthenticated$.subscribe((isSignIn) => {
            this.authenticated.set(isSignIn);
        });
    }

    public getBack(): void {
        this.location.back();
    }

    public onOpenSheet(): void {
        this.sheetVisibility.set(true);
    }

    public onCloseSheet(): void {
        this.sheetVisibility.set(false);
    }

    public saveToBookmark(recipe: RecipeType): void {
        if (!this.authenticated()) {
            this.toastr.info('Please Login first to mark this recipe');
            return;
        }

        const markedRecipe: MarkRecipeType = { ...recipe, recipeId: recipe.id };

        this.toastr.success('The recipe has marked');
        this.recipesService.markRecipe(markedRecipe).subscribe({
            next: () => {
                this.refreshRecipesSubject = this.markedRecipesService.refreshRecipes().subscribe();
            },
            error: (error: HttpErrorResponse) => {
                this.toastr.error(error.message);
            },
        });
    }

    public checkMarked(recipe: RecipeType): boolean {
        const isMarked = this.markedRecipes().find((rec) => rec.recipeId == recipe.id);
        return !!isMarked;
    }

    private trackMarkedRecipes(): void {
        this.markedRecipesSubject = this.markedRecipesService.recipes$.subscribe((recipes) => {
            this.markedRecipes.set(recipes);
        });
    }

    public deleteMarkedRecipe(id: number) {
        if (!this.authenticated()) {
            this.toastr.info('Please Login first to mark this recipe');
            return;
        }

        const mockApiId = this.markedRecipes().find((recipe) => recipe.recipeId == id)?.id;

        if (!mockApiId) {
            return;
        }

        this.toastr.success('The recipe has removed');
        this.recipesService.deleteMarkedRecipe(mockApiId).subscribe({
            next: () => {
                this.refreshRecipesSubject = this.markedRecipesService
                    .refreshRecipes()
                    .subscribe({});
            },
            error: (error: HttpErrorResponse) => {
                this.toastr.error(error.message);
            },
        });
    }

    public ngOnDestroy(): void {
        this.authSubscription?.unsubscribe();
        this.markedRecipesSubject?.unsubscribe();
        this.refreshRecipesSubject?.unsubscribe();
    }
}
