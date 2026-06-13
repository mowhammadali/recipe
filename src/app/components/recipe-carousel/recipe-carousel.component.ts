import { Component, Input, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { type RecipeType } from '../../types/recipes.type';

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
    @Input('navigation-link') navigationLink: string = '';
    @Input('recipes-data') recipes: RecipeType[] = [];
    @Input('is-fetching') isFetching: boolean = true;
}
