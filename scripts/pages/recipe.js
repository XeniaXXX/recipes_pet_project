import { recipeModel } from "../models/recipe-model.js";
import { renderRecipe } from "../components/recipe-full-card.js";

const fullRecipeParent = document.querySelector(".recipe");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const recipe = recipeModel.find((recipe) => recipe.id === Number(id));

if (recipe) {
  renderRecipe(fullRecipeParent, recipe);
}
