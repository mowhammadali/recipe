import { Component, OnInit, signal } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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

    selected = signal<string>('null');
    searchControl = new FormControl('');

    public ngOnInit(): void {
        this.onSearch();
    }

    items = [
        {
            id: 'null',
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

    selectItem(id: string) {
        this.selected.set(id);
    }

    public onSearch() {
        this.searchControl.valueChanges
            .pipe(debounceTime(2000), distinctUntilChanged())
            .subscribe((value) => {
                this.router.navigate(['.'], {
                    relativeTo: this.route,
                    queryParams: { q: value ? value.toLowerCase() : null },
                });
            });
    }
}
