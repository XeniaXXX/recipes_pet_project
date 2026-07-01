import { getUnit } from "../utils/helpers.js";

export function renderRecipe(parent, recipe) {
  parent.innerHTML = `
          <img class="recipe__img" src="${recipe.image}" alt="${recipe.title}" />

          <div class="recipe__header">
            <h1 class="recipe__title h2">${recipe.title}</h1>
            <ul class="recipe-card__cuisines">
            ${recipe.category
              .filter(Boolean)
              .map(
                (category) =>
                  `<li class="recipe-card__category">${category}</li>`,
              )
              .join(" ")}
            </ul>
            <ul class="recipe-card__tags">
           ${
             recipe.tags
               ?.split(",")
               .filter(Boolean)
               .map((tag) => `<li class="recipe-card__tag">${tag}</li>`)
               .join(" ") ?? ""
           }
            </ul>
          </div>

          <article class="recipe-stat recipe-stat--1">
            <svg
              class="icon recipe-stat__icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <g data-name="Layer 2">
                <path
                  d="M16 29a13 13 0 1 1 13-13 13 13 0 0 1-13 13m0-24a11 11 0 1 0 11 11A11 11 0 0 0 16 5"
                />
                <path
                  d="m21.5 22.5-.7-.3-5.5-5.5-.3-.7V8a1 1 0 0 1 2 0v7.6l5.2 5.2a1 1 0 0 1 0 1.4z"
                />
              </g>
              <path d="M0 0h32v32H0z" style="fill: none" />
            </svg>
            <div class="recipe-stat__body">
              <p class="recipe-stat__label">Total Time</p>
              <p class="recipe-stat__value">${Number(recipe.totalTime) || 0} ${Number(recipe.totalTime) === 1 ? "minute" : "minutes"}</p>
            </div>
          </article>
          <article class="recipe-stat recipe-stat--2">
            <svg
              class="icon recipe-stat__icon"
              xmlns="http://www.w3.org/2000/svg"
              xml:space="preserve"
              viewBox="0 0 86 86"
            >
              <path
                d="M71.2 51.2C74.1 48.8 76 45.1 76 41c0-6.9-5.6-13-12-13s-12 6.1-12 13c0 4.1 1.9 7.8 4.8 10.2q-2 .7-3.7 1.7-5.8-7-14.6-9.7C42.9 40.1 46 34.8 46 29c0-9.1-7.5-17-16-17s-16 7.9-16 17c0 5.8 3.1 11.1 7.5 14.2A30 30 0 0 0 0 72q.2 1.8 2 2h82a2 2 0 0 0 2-2 22 22 0 0 0-14.8-20.8M56 41c0-4.2 3.5-9 8-9s8 4.8 8 9-3.5 9-8 9-8-4.8-8-9M18 29c0-6.1 5.1-13 12-13s12 6.9 12 13-5.1 13-12 13-12-6.9-12-13M4.1 70a26 26 0 0 1 51.8 0zm55.8 0q-.5-7.6-4.5-13.8A18 18 0 0 1 81.9 70z"
              />
            </svg>
            <div class="recipe-stat__body">
              <p class="recipe-stat__label">Servings</p>
              <p class="recipe-stat__value">${recipe.servings} ${recipe.servings <= 1 ? "person" : "people"}</p>
            </div>
          </article>
          <article class="recipe-stat recipe-stat--3">
            <svg
              class="icon recipe-stat__icon"
              xmlns="http://www.w3.org/2000/svg"
              xml:space="preserve"
              viewBox="0 0 533.3 533.3"
            >
              <path
                d="M165.5 533.3c-35.6-74-16.6-116.3 10.7-156.2 30-43.8 37.6-87 37.6-87s23.5 30.5 14.1 78.3c41.6-46.2 49.4-119.9 43.1-148.1 94 65.6 134.1 207.7 80 313C638.7 370.6 422.6 127 385 99.6c12.5 27.4 14.9 73.8-10.5 96.4-42.9-162.7-149-196-149-196 12.6 83.9-45.4 175.6-101.3 244.1-2-33.4-4-56.5-21.7-88.5-4 60.8-50.3 110.3-63 171.2-17 82.4 12.8 142.8 126 206.5"
              />
            </svg>
            <div class="recipe-stat__body">
              <p class="recipe-stat__label">Calories</p>
              <p class="recipe-stat__value">${recipe.calories || 0} per serving</p>
            </div>
          </article>

          <aside class="recipe__aside">
            <div class="recipe__info recipe__info-ingredients">
              <h2 class="recipe__info-title h3">Ingredients</h2>
              <ul class="recipe-list recipe-list__ingredients">
              ${recipe.ingredients
                .split("\n")
                .map(
                  (ingredient) =>
                    `<li class="recipe-list__item">${ingredient}</li>`,
                )
                .join(" ")}
              </ul>
            </div>
            <div class="recipe__info recipe__info-nutritions">
              <h2 class="recipe__info-title h3">Nutrition Facts</h2>
              <ul class="recipe-list recipe-list__nutritions">
              ${Object.entries(recipe.nutritionFacts)
                .map(
                  ([
                    key,
                    value,
                  ]) => `<li class="recipe-list__item recipe-list__nutritions-item">
                  ${key.slice(0, 1).toUpperCase() + key.slice(1)} <span class="recipe-list__item-num">${value || 0}</span>
                </li>`,
                )
                .join(" ")}         
              </ul>
            </div>
            <div class="recipe__info recipe__info-timing">
              <h2 class="recipe__info-title h3">Timing</h2>
              <ul class="recipe-list recipe-list__timing">
                <li class="recipe-list__item recipe-list__timing-item">
                  Cook Time
                  <span class="recipe-list__item-num">${recipe.cookTime} min</span>
                </li>
                <li class="recipe-list__item recipe-list__timing-item">
                  Total Time
                  <span class="recipe-list__item-num">${recipe.totalTime} min</span>
                </li>
              </ul>
            </div>
          </aside>

          <div class="recipe__directions">
            <div class="recipe__info">
              <h2 class="recipe__info-title h3">Directions</h2>

              <ol class="recipe-list recipe-list__directions">
              ${recipe.directions
                .split("\n")
                .map(
                  (direction) =>
                    `<li class="recipe-list__item recipe-list__directions-item">${direction}</li>`,
                )
                .join(" ")}
              </ol>

              <div class="recipe__directions-resource">
                <p class="recipe__directions-source">
                  Recipe source: ${recipe.url}
                </p>
                <a class="recipe__directions-link" href="${recipe.url}"
                  >View Original
                  <svg
                    class="icon recipe__directions-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                  >
                    <path
                      fill="#000"
                      d="M11.7 13.7 18 7.4V11h2V4h-7v2h3.6l-6.3 6.3z"
                    />
                    <path
                      fill="#000"
                      d="M19 18v-4h-2v4H6V7h4V5H6a2 2 0 0 0-2 2v11q.2 1.8 2 2h11a2 2 0 0 0 2-2"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          `;
}
