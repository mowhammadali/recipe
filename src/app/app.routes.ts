import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { LoginComponent } from './pages/login/login.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { CreateRecipeComponent } from './pages/create-recipe/create-recipe.component';
import { MyRecipesComponent } from './pages/my-recipes/my-recipes.component';
import { CreatedRecipesComponent } from './pages/created-recipes/created-recipes.component';
import { SavedRecipesComponent } from './pages/saved-recipes/saved-recipes.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'recipes',
        component: RecipesComponent,
    },
    {
        path: 'recipes/create',
        component: CreateRecipeComponent,
    },
    {
        path: 'recipes/:id',
        component: RecipeComponent,
    },
    {
        path: 'my-recipes',
        component: MyRecipesComponent,
        children: [
            { path: '', component: CreatedRecipesComponent },
            { path: 'saved', component: SavedRecipesComponent },
        ],
    },
    {
        path: 'profile',
        component: ProfileComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
    },
    {
        path: '**',
        redirectTo: 'not-found',
        pathMatch: 'full',
    },
];
