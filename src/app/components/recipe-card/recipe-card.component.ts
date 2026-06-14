import { Component, Input } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { type RecipeType } from '../../types/recipes.type';

@Component({
    selector: 'app-recipe-card',
    imports: [IconComponent, TruncatePipe],
    templateUrl: './recipe-card.component.html',
    styleUrl: './recipe-card.component.css',
})
export class RecipeCardComponent {
    @Input() recipe = {} as RecipeType;
}
