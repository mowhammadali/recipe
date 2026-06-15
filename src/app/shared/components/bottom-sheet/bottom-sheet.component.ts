import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgClass, NgIf, NgStyle } from '@angular/common';

@Component({
    selector: 'app-bottom-sheet',
    standalone: true,
    imports: [NgClass, NgStyle, NgIf],
    templateUrl: './bottom-sheet.component.html',
    styleUrl: './bottom-sheet.component.css',
})
export class BottomSheetComponent {
    @Input() isOpen = false;

    @Input() padding = '16px';

    @Output() closed = new EventEmitter<void>();

    close() {
        this.isOpen = false;
        this.closed.emit();
    }

    @HostListener('document:keydown.escape')
    onEsc() {
        if (this.isOpen) this.close();
    }
}
