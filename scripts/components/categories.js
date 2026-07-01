import { recipeModel } from "../models/recipe-model.js";

const ingredientsArr = Array.from(
  new Set(
    recipeModel.map((recipe) => {
      return recipe.mainIngredient;
    }),
  ),
).filter((item) => item !== "");

export const ingredientsHtml = ingredientsArr
  .map((ingredient) => {
    return `<a href="./recipes.html?ingredient=${encodeURIComponent(ingredient)}" class="ingredient">${ingredient}</a>`;
  })
  .join("");
