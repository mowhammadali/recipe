import { Component, Input } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { type RecipeType } from '../../types/recipes.type';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-recipe-card',
    imports: [IconComponent, TruncatePipe, RouterLink],
    templateUrl: './recipe-card.component.html',
    styleUrl: './recipe-card.component.css',
})
export class RecipeCardComponent {
    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}

    @Input() recipe = {} as RecipeType;

    public navigateToRecipeDetails(id: number): void {
        this.router.navigate(['.', id], { relativeTo: this.route });
    }
}
