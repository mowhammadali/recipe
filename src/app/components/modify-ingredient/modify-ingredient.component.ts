import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { DialogRefService } from '../../services/dialog-ref.service';
import { FormsModule } from '@angular/forms';
import { InputDirective } from '../../directives/input.directive';

@Component({
    selector: 'app-modify-ingredient',
    imports: [ButtonComponent, FormsModule, InputDirective],
    templateUrl: './modify-ingredient.component.html',
    styleUrl: './modify-ingredient.component.css',
})
export class ModifyIngredientComponent {
    constructor(private dialogRef: DialogRefService) {}

    @Input() type: 'edit' | 'create' = 'create';
    @Input('initial-value') initialValue: string = '';
    @Output('add') addIngredient = new EventEmitter();

    get isCreate(): boolean {
        return this.type === 'create';
    }

    public close(): void {
        this.dialogRef.close();
    }

    public modify(): void {
        if (this.initialValue) {
            this.addIngredient.emit(this.initialValue);
            this.initialValue = '';
            this.close();
        }
    }
}
