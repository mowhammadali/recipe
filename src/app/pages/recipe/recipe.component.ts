import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';
import { finalize } from 'rxjs';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { type RecipeType } from '../../types/recipes.type';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { IngredientsComponent } from '../../components/ingredients/ingredients.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { BottomSheetComponent } from '../../shared/components/bottom-sheet/bottom-sheet.component';
import { InstructionsComponent } from '../../components/instructions/instructions.component';

@Component({
    selector: 'app-recipe',
    imports: [
        SkeletonComponent,
        IconComponent,
        RouterLink,
        InfoBoxComponent,
        IngredientsComponent,
        ButtonComponent,
        BottomSheetComponent,
        InstructionsComponent,
    ],
    templateUrl: './recipe.component.html',
    styleUrl: './recipe.component.css',
})
export class RecipeComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private recipesService: RecipesService
    ) {}

    public isLoading = signal<boolean>(true);
    public recipe = signal<RecipeType>({} as RecipeType);
    public sheetVisibility = signal<boolean>(false);

    public ngOnInit(): void {
        this.trackParams();
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

    public onOpenSheet(): void {
        this.sheetVisibility.set(true);
    }

    public onCloseSheet(): void {
        this.sheetVisibility.set(false);
    }
}
