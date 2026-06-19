import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogRefService } from '../../../services/dialog-ref.service';

@Component({
    selector: 'app-dialog',
    standalone: true,
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css'],
    providers: [DialogRefService],
})
export class DialogComponent {
    @Input() open = false;
    @Input() width = '330px';
    @Input() closeOnBackdrop = true;
    @Output() openChange = new EventEmitter<boolean>();

    constructor(private dialogRef: DialogRefService) {
        this.dialogRef.register(() => this.close());
    }

    close(): void {
        this.open = false;
        this.openChange.emit(false);
    }

    backdropClick(): void {
        if (!this.closeOnBackdrop) {
            return;
        }

        this.close();
    }
}
