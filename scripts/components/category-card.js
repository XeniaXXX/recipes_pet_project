import { recipeModel } from "../models/recipe-model.js";

const cuisunesObj = recipeModel.reduce((obj, recipe) => {
  const cuisine = recipe.cuisine.trim();

  if (recipe.cuisine) {
    obj[cuisine] = (obj[cuisine] || 0) + 1;
  }

  return obj;
}, {});

const cuisinesArr = Object.entries(cuisunesObj);

export const cuisinesCardHtml = cuisinesArr
  .map((cuisineArr) => {
    return `  <a href="./recipes.html?cuisine=${cuisineArr[0]}" class="cuisines__card">
              <figure class="cuisines__card-image-wrapper">
                <img
                  src="images/cuisines/${cuisineArr[0]}-cuisine.jpg"
                  onerror="this.onerror=null; this.src='images/cuisines/default-cuisine.jpg'"
                  alt="picture describing type of cuisine"
                  class="cuisines__card-image"
                  width="200"
                  height="200"
                  loading="lazy"
                />
              </figure>
              <h3 class="cuisines__card-title">${cuisineArr[0]}</h3>
              <p class="cuisines__card-recipes">${cuisineArr[1]} ${cuisineArr[1] === 1 ? "recipe" : "recipes"}</p>
            </a>`;
  })
  .join(" ");
