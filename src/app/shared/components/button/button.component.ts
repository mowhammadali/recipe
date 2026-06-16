import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-button',
    imports: [],
    templateUrl: './button.component.html',
    styleUrl: './button.component.css',
})
export class ButtonComponent {
    @Input('background-color') backgroundColor: string = 'var(--color-primary)';
    @Input('text-color') textColor: string = 'var(--color-surface-2)';
    @Input('font-size') fontSize: string = '1rem';
    @Input('full-width') fullWidth: boolean = false;
    @Input('type') type: 'button' | 'submit' = 'button';
    @Input('disabled') disabled: boolean = false;
    @Output() task = new EventEmitter<any>();
}
