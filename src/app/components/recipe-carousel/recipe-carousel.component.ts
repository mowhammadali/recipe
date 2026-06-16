import { Component, Input, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal, OnDestroy } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { type RecipeType } from '../../types/recipes.type';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-recipe-carousel',
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [IconComponent, NgFor, RouterLink, TruncatePipe],
    templateUrl: './recipe-carousel.component.html',
    styleUrl: './recipe-carousel.component.css',
})
export class RecipeCarouselComponent implements OnInit, OnDestroy {
    constructor(
        private authService: AuthService,
        private toastr: ToastrService,
        private router: Router
    ) {}

    private authenticated = signal<boolean>(false);
    private authSubscription: Subscription;

    @Input('carousel-title') title: string = '';
    @Input('navigation-link') navigationLink: string = '';
    @Input('recipes-data') recipes: RecipeType[] = [];
    @Input('is-fetching') isFetching: boolean = true;

    public ngOnInit(): void {
        this.authSubscription = this.authService.isAuthenticated$.subscribe((isSignIn) => {
            this.authenticated.set(isSignIn);
        });
    }

    public navigateToRecipe(id: string | number): void {
        this.router.navigate(['/recipes', id]);
    }

    public saveToBookmark(): void {
        if (!this.authenticated()) {
            this.toastr.info('Please Login first to mark this recipe');
            return;
        }
    }

    public ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }
}
