import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appInput]',
})
export class InputDirective implements OnInit {
    constructor(
        private renderer: Renderer2,
        private element: ElementRef
    ) {}

    ngOnInit(): void {
        this.renderer.addClass(this.element.nativeElement, 'global-input');
    }
}
