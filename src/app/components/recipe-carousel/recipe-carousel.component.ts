import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-recipe-carousel',
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [IconComponent, NgFor, RouterLink],
    templateUrl: './recipe-carousel.component.html',
    styleUrl: './recipe-carousel.component.css',
})
export class RecipeCarouselComponent {
    @Input('carousel-title') title: string = '';

    recipes = [
        { title: 'Mixin sea food', time: 6, image: '/images/1.webp' },
        { title: 'Chicken burger', time: 10, image: '/images/1.webp' },
        { title: 'Pasta cream', time: 8, image: '/images/1.webp' },
        { title: 'Beef steak', time: 15, image: '/images/1.webp' },
        { title: 'Veg salad', time: 5, image: '/images/1.webp' },
    ];
}
