import { Component, Input } from '@angular/core';
import { RecipeType } from '../../types/recipes.type';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
    selector: 'app-instructions',
    imports: [IconComponent],
    templateUrl: './instructions.component.html',
    styleUrl: './instructions.component.css',
})
export class InstructionsComponent {
    @Input('recipe') recipe = {} as RecipeType;
}
