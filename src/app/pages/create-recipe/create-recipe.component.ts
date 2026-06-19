import { Component, signal } from '@angular/core';
import { AuthControllerComponent } from '../../components/auth-controller/auth-controller.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { ModifyIngredientComponent } from '../../components/modify-ingredient/modify-ingredient.component';
import { InputDirective } from '../../directives/input.directive';
import { ModifyInstructionComponent } from '../../components/modify-instruction/modify-instruction.component';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { RecipesService } from '../../services/recipes.service';
import { CreatedRecipe } from '../../types/recipes.type';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

type DeleteType = 'ingredient' | 'instruction';

type ModifyType = 'create' | 'edit';

type ModifyInputType = {
    value: string;
    type: ModifyType;
};

@Component({
    selector: 'app-create-recipe',
    imports: [
        AuthControllerComponent,
        IconComponent,
        ButtonComponent,
        FormsModule,
        DialogComponent,
        ModifyIngredientComponent,
        InputDirective,
        ModifyInstructionComponent,
        TruncatePipe,
        MatProgressSpinnerModule,
    ],
    templateUrl: './create-recipe.component.html',
    styleUrl: './create-recipe.component.css',
})
export class CreateRecipeComponent {
    constructor(
        private recipesService: RecipesService,
        private toastr: ToastrService
    ) {}

    public recipeName: string = '';
    public preparingTime: string = '';
    public serving: string = '';
    public modifyIngredientDialogOpening: boolean = false;
    public modifyInstructionDialogOpening: boolean = false;
    public deleteDialogOpening: boolean = false;
    public isSending: boolean = false;
    public tempIngredientValue: string = '';
    public tempInstructionValue: string = '';
    public tempIngredientType: ModifyType = 'create';
    public tempInstructionType: ModifyType = 'create';
    public deleteType: DeleteType = 'ingredient';
    public tempIngredientIndex: number | null = null;
    public tempInstructionIndex: number | null = null;
    public ingredientList = signal<string[]>([]);
    public instructionList = signal<string[]>([]);

    public openModifyIngredient(value: string, index: number | null, type: ModifyType): void {
        this.tempIngredientValue = value;
        this.tempIngredientIndex = index;
        this.tempIngredientType = type;
        this.modifyIngredientDialogOpening = true;
    }

    public openModifyInstruction(value: string, index: number | null, type: ModifyType): void {
        this.tempInstructionValue = value;
        this.tempInstructionIndex = index;
        this.tempInstructionType = type;
        this.modifyInstructionDialogOpening = true;
    }

    public addNewIngredient(input: ModifyInputType): void {
        if (input.type === 'create') {
            this.ingredientList.update((ingredients) => [...ingredients, input.value]);
            return;
        }

        const newList = this.ingredientList().map((item, i) =>
            i === this.tempIngredientIndex ? input.value : item
        );

        this.ingredientList.update(() => [...newList]);
    }

    public addNewInstruction(input: ModifyInputType): void {
        if (input.type === 'create') {
            this.instructionList.update((instructions) => [...instructions, input.value]);
            return;
        }

        const newList = this.instructionList().map((item, i) =>
            i === this.tempInstructionIndex ? input.value : item
        );

        this.instructionList.update(() => [...newList]);
    }

    public openDeleteDialog(type: DeleteType, index: number | null): void {
        if (type === 'ingredient') {
            this.tempIngredientIndex = index;
        } else {
            this.tempInstructionIndex = index;
        }
        this.deleteType = type;
        this.deleteDialogOpening = true;
    }

    public deleteIngredient(type: 'ingredient' | 'instruction'): void {
        if (type === 'ingredient') {
            const newList = this.ingredientList().filter(
                (_, index) => index != this.tempIngredientIndex
            );
            this.ingredientList.update(() => [...newList]);
        } else {
            const newList = this.instructionList().filter(
                (_, index) => index != this.tempInstructionIndex
            );
            this.instructionList.update(() => [...newList]);
        }

        this.tempIngredientIndex = null;
        this.tempInstructionIndex = null;
        this.deleteDialogOpening = false;
    }

    public createRecipe(): void {
        const recipe: Omit<CreatedRecipe, 'id'> = {
            name: this.recipeName,
            prepTimeMinutes: +this.preparingTime,
            serving: +this.serving,
            ingredients: this.ingredientList(),
            instructions: this.instructionList(),
            createdAt: new Date(),
            image: 'https://dummyjson.com/image/300/282828?fontFamily=pacifico&text=Recipe',
        };

        this.isSending = true;

        this.recipesService
            .createNewRecipe(recipe)
            .pipe(
                finalize(() => {
                    this.isSending = false;
                })
            )
            .subscribe({
                next: () => {
                    this.toastr.success('Your recipe has created!');
                    this.resetAllValues();
                },
            });
    }

    public resetAllValues(): void {
        ((this.recipeName = ''),
            (this.preparingTime = ''),
            (this.serving = ''),
            this.ingredientList.set([]));
        this.instructionList.set([]);
    }
}
