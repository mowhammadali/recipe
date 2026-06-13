import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { type RecipeType } from '../../types/recipes.type';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
    selector: 'app-recipe-carousel',
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [IconComponent, NgFor, RouterLink, TruncatePipe],
    templateUrl: './recipe-carousel.component.html',
    styleUrl: './recipe-carousel.component.css',
})
export class RecipeCarouselComponent {
    @Input('carousel-title') title: string = '';
    @Input('navigation-link') navigationLink: string = '';
    @Input('recipes-data') recipes: RecipeType[] = [];
    @Input('is-fetching') isFetching: boolean = true;
}
