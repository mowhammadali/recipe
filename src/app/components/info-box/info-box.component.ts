import { Component, Input } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { RecipeType } from '../../types/recipes.type';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
    selector: 'app-info-box',
    imports: [IconComponent, TruncatePipe],
    templateUrl: './info-box.component.html',
    styleUrl: './info-box.component.css',
})
export class InfoBoxComponent {
    @Input('recipe') recipe = {} as RecipeType;
}
