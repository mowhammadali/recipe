import { Component, OnInit, signal } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

type SortType = string | null;

@Component({
    selector: 'app-recipes-controls',
    imports: [
        IconComponent,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        NgFor,
        ReactiveFormsModule,
    ],
    templateUrl: './recipes-controls.component.html',
    styleUrl: './recipes-controls.component.css',
})
export class RecipesControlsComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}

    selected = signal<SortType>(null);
    searchControl = new FormControl('');

    public ngOnInit(): void {
        this.onSearch();
        this.trackQueryParams();
    }

    items = [
        {
            id: null,
            label: 'None',
            icon: 'sort',
        },
        {
            id: 'rating&desc',
            label: 'Highest Rating',
            icon: 'arrow_downward',
        },
        {
            id: 'rating&asc',
            label: 'Lowest Rating',
            icon: 'arrow_upward',
        },
    ];

    public selectItem(id: SortType) {
        this.selected.set(id);
        this.onSort(id);
    }

    private onSort(id: SortType) {
        const queryParams = { sortBy: null, order: null } as any;

        if (this.selected() != null) {
            const params = id?.split('&');

            queryParams.sortBy = params ? params[0] : null;
            queryParams.order = params ? params[1] : null;
        }

        this.router.navigate(['.'], {
            relativeTo: this.route,
            queryParams,
            queryParamsHandling: 'merge',
        });
    }

    private onSearch() {
        this.searchControl.valueChanges
            .pipe(debounceTime(2000), distinctUntilChanged())
            .subscribe((value) => {
                this.router.navigate(['.'], {
                    relativeTo: this.route,
                    queryParams: { q: value ? value.toLowerCase() : null },
                    queryParamsHandling: 'merge',
                });
            });
    }

    private trackQueryParams() {
        this.route.queryParams.subscribe((value) => {
            const q = value['q'];
            const sortBy = value['sortBy'];
            const order = value['order'];

            if (q) {
                if (this.searchControl.value != q) {
                    this.searchControl.setValue(q);
                }
            }

            if (sortBy && order) {
                const id = [sortBy, order].join('&');

                if (this.selected() != id) {
                    this.selected.set(id);
                }
            }
        });
    }
}
