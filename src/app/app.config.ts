import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { register } from 'swiper/element/bundle';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { AuthInterceptor } from './core/auth.interceptor';
import { provideAppInitializer } from '@angular/core';
import { initializeAuth } from './core/auth.initializer';
import { MarkedRecipesService } from './services/marked-recipes.service';

register();

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimations(),
        provideToastr(),
        provideHttpClient(withInterceptorsFromDi()),
        provideAppInitializer(initializeAuth),
        provideAppInitializer(() => {
            const markedRecipesService = inject(MarkedRecipesService);

            markedRecipesService.loadRecipes().subscribe();
        }),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
};
