import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { DialogRefService } from '../../services/dialog-ref.service';
import { FormsModule } from '@angular/forms';
import { InputDirective } from '../../directives/input.directive';

@Component({
    selector: 'app-modify-instruction',
    imports: [ButtonComponent, FormsModule, InputDirective],
    templateUrl: './modify-instruction.component.html',
    styleUrl: './modify-instruction.component.css',
})
export class ModifyInstructionComponent {
    constructor(private dialogRef: DialogRefService) {}

    @Input() type: 'edit' | 'create' = 'create';
    @Input('initial-value') initialValue: string = '';
    @Output('add') addInstruction = new EventEmitter();

    get isCreate(): boolean {
        return this.type === 'create';
    }

    public close(): void {
        this.dialogRef.close();
    }

    public modify(): void {
        if (this.initialValue) {
            this.addInstruction.emit({
                value: this.initialValue,
                type: this.type,
            });
            this.initialValue = '';
            this.close();
        }
    }
}
