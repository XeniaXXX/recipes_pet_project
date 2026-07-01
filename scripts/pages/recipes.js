import { recipeModel } from "../models/recipe-model.js";
import { renderRecipesCards } from "../components/recipe-card-preview.js";
import { handleSubmit } from "../components/search.js";

function cacheDOM() {
  const allRecipesParent = document.querySelector(".all-recipes__all"),
    searchFormTop = document.querySelector(".header__search-wrapper"),
    allRecipesNum = document.querySelector(".recipes__amount"),
    form = document.querySelector(".filters__form"),
    clearFiltersBtn = form.querySelector(".filters-top__clear-btn");

  return {
    allRecipesParent,
    allRecipesNum,
    searchFormTop,
    form,
    clearFiltersBtn,
  };
}

function bindEvents(elements) {
  const { searchFormTop, form, clearFiltersBtn } = elements;

  searchFormTop.addEventListener("submit", handleSubmit);

  form.addEventListener("input", (e) => {
    handleFiltersInput(e, elements);
  });

  clearFiltersBtn.addEventListener("click", () => {
    handleCrearFilters(elements);
  });
}

function showRecipesNumber(parent, number) {
  parent.textContent = `${number} ${number === 1 ? "recipe" : "recipes"} found`;
}

function getRange(recipes, property) {
  return recipes.reduce(
    (range, recipe) => {
      range.min = Math.min(range.min, recipe[property]);
      range.max = Math.max(range.max, recipe[property]);

      return range;
    },
    {
      min: Infinity,
      max: -Infinity,
    },
  );
}

function updateRangeText(rangeInput) {
  const rangeBlock = rangeInput.closest(".filters-group__range");
  const subtitle = rangeBlock.querySelector(".filters-group__subtitle");

  changeRangeTextValue(
    subtitle,
    Number(rangeInput.value),
    Number(rangeInput.max),
    rangeInput.dataset.unit,
  );
}

function initRanges(form) {
  const ranges = {
    maxTime: getRange(recipeModel, "totalTime"),
    maxCalories: getRange(recipeModel, "calories"),
  };

  Object.entries(ranges).forEach(([name, range]) => {
    const input = form.querySelector(`[name="${name}"]`);

    input.min = range.min;
    input.max = range.max;
    input.value = range.min;

    updateRangeText(input);
  });
}

function changeRangeTextValue(parent, from, to, unit = "") {
  parent.textContent = `${from} - ${to} ${unit}`;
}

function handleFiltersInput(e, elements) {
  if (e.target.type === "range") {
    updateRangeText(e.target);
  }

  renderPage(elements);
}

function handleCrearFilters(elements) {
  const { form } = elements;
  form.reset();

  initRanges(form);
  renderPage(elements);
}

function getFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);

  return {
    ingredient: params?.get("ingredient") ? [params?.get("ingredient")] : null,
    cuisine: params?.get("cuisine") ? [params?.get("cuisine")] : null,
    search: params?.get("search") ? params?.get("search") : null,
  };
}

function getFiltersFromForm(form) {
  const filters = {};

  Array.from(form.elements).forEach((element) => {
    const key = element.name;
    const value =
      element.value.slice(0, 1).toUpperCase() + element.value.slice(1);

    if (!key) return;

    if (element.type === "checkbox") {
      if (!element.checked) return;

      if (!filters[key]) {
        filters[key] = [];
      }

      filters[key].push(value);
    }

    if (element.type === "range") {
      if (Number(element.value) === 0) return;
      filters[key] = {
        min: Number(element.value),
        max: Number(element.max),
      };
    }
  });
  console.log(filters);

  return filters;
}

function renderPage(elements) {
  const { allRecipesNum, allRecipesParent, form } = elements;

  const urlFilters = getFiltersFromURL();
  const formFilters = getFiltersFromForm(form);
  const filters = mergeFilters(urlFilters, formFilters);
  console.log(filters);
  const filteredRecipes = filterRecipes(recipeModel, filters);
  console.log(filteredRecipes);

  renderRecipesCards(allRecipesParent, filteredRecipes);

  showRecipesNumber(allRecipesNum, filteredRecipes.length);
}

function mergeFilters(urlFilters, formFilters) {
  const cuisine = [
    ...(urlFilters.cuisine || []),
    ...(formFilters.cuisine || []),
  ];

  const ingredients = [
    ...(urlFilters.ingredient || []),
    ...(formFilters.ingredient || []),
  ];

  return {
    search: urlFilters.search || "",
    cuisine: [...new Set(cuisine)],
    ingredient: [...new Set(ingredients)],
    maxTime: formFilters.maxTime ?? "",
    maxCalories: formFilters.maxCalories ?? "",
  };
}

const filterHandlers = {
  search: (recipe, value) => {
    if (!value) return true;
    const fields = [
      recipe.cuisine,
      recipe.ingredients,
      recipe.mainIngredient,
      recipe.title,
    ]
      .join(" ")
      .toLowerCase();
    console.log(recipe, value);
    return fields.includes(value);
  },
  cuisine: (recipe, value) => value.includes(recipe.cuisine),
  ingredient: (recipe, values) =>
    values.some(
      (value) =>
        recipe.mainIngredient === value || recipe.ingredients.includes(value),
    ),
  maxTime: (recipe, value) =>
    recipe.totalTime >= value.min && recipe.totalTime <= value.max,
  maxCalories: (recipe, value) =>
    recipe.calories >= value.min && recipe.calories <= value.max,
};

function filterRecipes(recipes, filters) {
  let filteredRecipes = recipes;

  for (let key in filters) {
    const value = filters[key];
    if (
      value == null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      continue;
    }

    const handler = filterHandlers[key];
    if (!handler) continue;

    filteredRecipes = filteredRecipes.filter((recipe) =>
      handler(recipe, value),
    );
  }
  return filteredRecipes;
}

function init() {
  const elements = cacheDOM();

  initRanges(elements.form);
  renderPage(elements);
  bindEvents(elements);
}

init();
