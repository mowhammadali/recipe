export type RecipeType = {
    id: number;
    name: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    caloriesPerServing: number;
    tags: string[];
    userId: number;
    image: string;
    rating: number;
    reviewCount: number;
    mealType: string[];
};

export type MarkRecipeType = RecipeType & {
    recipeId: number;
};

export type RecipesResponseType = {
    limit: number;
    skip: number;
    total: number;
    recipes: RecipeType[];
};
