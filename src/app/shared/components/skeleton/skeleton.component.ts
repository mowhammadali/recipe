import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-skeleton',
    imports: [],
    templateUrl: './skeleton.component.html',
    styleUrl: './skeleton.component.css',
})
export class SkeletonComponent {
    @Input() width: string = '100%';
    @Input() height: string = '20px';

    @Input() variant: 'rectangle' | 'circle' = 'rectangle';
}
