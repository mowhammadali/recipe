import { Component, Input } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
    selector: 'app-recipe-carousel',
    imports: [IconComponent],
    templateUrl: './recipe-carousel.component.html',
    styleUrl: './recipe-carousel.component.css',
})
export class RecipeCarouselComponent {
    @Input('carousel-title') title: string = '';
}
