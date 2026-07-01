import { recipeModel } from "../models/recipe-model.js";
import { ingredientsHtml } from "../components/categories.js";
import { cuisinesCardHtml } from "../components/category-card.js";
import { renderRecipesCards } from "../components/recipe-card-preview.js";
import { handleSubmit } from "../components/search.js";

function cacheDOM() {
  const ingredientsParent = document.querySelector(".hero__body-ingredient"),
    cuisinesParent = document.querySelector(".cuisines__cards"),
    recipesCardsParent = document.querySelector(".recipes__cards"),
    searchFormTop = document.querySelector(".header__search-wrapper"),
    searchFormMain = document.querySelector(".hero__body-search");

  return {
    ingredientsParent,
    cuisinesParent,
    recipesCardsParent,
    searchForms: [searchFormTop, searchFormMain],
  };
}

function renderPage(elements) {
  const { ingredientsParent, cuisinesParent, recipesCardsParent } = elements;
  ingredientsParent.innerHTML = `<p class="hero__body-ingredient__title">Popular:</p> ${ingredientsHtml}`;

  cuisinesParent.innerHTML = cuisinesCardHtml;

  renderRecipesCards(recipesCardsParent, recipeModel, 3);
}

function bindEvents(elements) {
  const { searchForms } = elements;

  searchForms.forEach((form) => form.addEventListener("submit", handleSubmit));
}

function init() {
  const elements = cacheDOM();

  renderPage(elements);
  bindEvents(elements);
}

init();
