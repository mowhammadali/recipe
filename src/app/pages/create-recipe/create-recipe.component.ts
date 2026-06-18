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
    public tempIngredientValue: string = '';
    public tempInstructionValue: string = '';
    public tempIngredientType: ModifyType = 'create';
    public tempInstructionType: ModifyType = 'create';
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
}
