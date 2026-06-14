import { Component, signal } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-recipes-controls',
    imports: [IconComponent, MatMenuModule, MatIconModule, MatButtonModule, NgFor, NgIf],
    templateUrl: './recipes-controls.component.html',
    styleUrl: './recipes-controls.component.css',
})
export class RecipesControlsComponent {
    selected = signal<string>('null');

    items = [
        {
            id: 'null',
            label: 'None',
            icon: 'sort',
        },
        {
            id: 'rating&desc',
            label: 'Highest Rating',
            icon: 'arrow_downward',
        },
        {
            id: 'rating&asc',
            label: 'Lowest Rating',
            icon: 'arrow_upward',
        },
    ];

    selectItem(id: string) {
        this.selected.set(id);
    }
}
