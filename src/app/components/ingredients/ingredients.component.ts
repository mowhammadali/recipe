import { Component, Input } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
    selector: 'app-ingredients',
    imports: [IconComponent, TruncatePipe],
    templateUrl: './ingredients.component.html',
    styleUrl: './ingredients.component.css',
})
export class IngredientsComponent {
    @Input('ingredients') ingredients: string[] = [];
}
