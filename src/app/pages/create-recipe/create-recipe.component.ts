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
    ],
    templateUrl: './create-recipe.component.html',
    styleUrl: './create-recipe.component.css',
})
export class CreateRecipeComponent {
    public recipeName: string = '';
    public preparingTime: string = '';
    public serving: string = '';
    public modifyIngredientDialogOpening: boolean = false;
    public modifyInstructionDialogOpening: boolean = false;
    public ingredientList = signal<string[]>([]);
    public instructionList = signal<string[]>([]);

    public openModifyIngredient(): void {
        this.modifyIngredientDialogOpening = true;
    }

    public openModifyInstruction(): void {
        this.modifyInstructionDialogOpening = true;
    }

    public addNewIngredient(ingredient: string): void {
        this.ingredientList.update((ingredients) => [...ingredients, ingredient]);
    }
    public addNewInstruction(instruction: string): void {
        this.instructionList.update((instructions) => [...instructions, instruction]);
    }
}
