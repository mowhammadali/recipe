import { Component, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

type QueryType = string | null;

type MealType = {
    title: string;
    image: string;
    query: QueryType;
};

@Component({
    selector: 'app-meal-type',
    imports: [NgClass],
    templateUrl: './meal-type.component.html',
    styleUrl: './meal-type.component.css',
})
export class MealTypeComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}

    public query = signal<QueryType>(null);

    public meals: MealType[] = [
        { title: 'All Food', image: '/images/all-food.png', query: null },
        { title: 'Breakfast', image: '/images/breakfast.png', query: 'breakfast' },
        { title: 'Snack', image: '/images/snack.png', query: 'snack' },
        { title: 'Dinner', image: '/images/dinner.png', query: 'dinner' },
        { title: 'Dessert', image: '/images/dessert.png', query: 'dessert' },
        { title: 'Lunch', image: '/images/lunch.png', query: 'lunch' },
        { title: 'Appetizer', image: '/images/appetizer.png', query: 'appetizer' },
        { title: 'Beverage', image: '/images/beverage.png', query: 'beverage' },
    ];

    public ngOnInit(): void {
        this.trackQueryParams();
    }

    public setQuery(query: QueryType): void {
        this.query.set(query);
        this.onChangeMeal(query);
    }

    private onChangeMeal(query: QueryType) {
        this.router.navigate(['.'], {
            relativeTo: this.route,
            queryParams: { 'meal-type': query },
            queryParamsHandling: 'merge',
        });
    }

    private trackQueryParams(): void {
        this.route.queryParams.subscribe((value) => {
            const mealType = value['meal-type'];

            if (mealType) {
                this.query.set(mealType);
            }
        });
    }
}
