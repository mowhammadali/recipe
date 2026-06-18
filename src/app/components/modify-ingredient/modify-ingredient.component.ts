import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { DialogRefService } from '../../services/dialog-ref.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-modify-ingredient',
    imports: [ButtonComponent, FormsModule],
    templateUrl: './modify-ingredient.component.html',
    styleUrl: './modify-ingredient.component.css',
})
export class ModifyIngredientComponent {
    constructor(private dialogRef: DialogRefService) {}
    @Input() type: 'edit' | 'create' = 'create';
    @Input('initial-value') initialValue: string = '';

    get isCreate(): boolean {
        return this.type === 'create';
    }

    public close(): void {
        this.dialogRef.close();
    }
}
