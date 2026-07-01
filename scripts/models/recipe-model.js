import { getRecipes } from "../api/recipes-api.js";

const allRecipes = await getRecipes();

export const recipeModel = allRecipes.map((recipe) => {
  return {
    id: recipe.id,
    title: recipe.title,
    image: recipe.photoUrl,
    category: [recipe.cuisine, recipe.course, recipe.mainIngredient],
    tags: recipe.tags,
    totalTime: recipe.totalTime,
    cookTime: recipe.cookTime,
    servings: recipe.servings,
    calories: recipe.calories,
    ingredients: recipe.ingredients,
    nutritionFacts: {
      calories: recipe.calories,
      protein: recipe.protein,
      carbohydrate: recipe.carbohydrate,
      fat: recipe.fat,
      fiber: recipe.fiber,
      sugar: recipe.sugar,
      sodium: recipe.sodium,
      cholesterol: recipe.cholesterol,
    },
    directions: recipe.directions,
    url: recipe.url,
    mainIngredient: recipe.mainIngredient,
    cuisine: recipe.cuisine,
  };
});
