import { recipeModel } from "../models/recipe-model.js";

export function renderRecipesCards(parent, recipes, limit = Infinity) {
  parent.innerHTML = `
  ${recipes
    .slice(0, limit)
    .map((recipe) => {
      return `<a href="./recipe.html?id=${recipe.id}" id="${recipe.id}" class="recipe-card">
              <div class="recipe-card__image-wrapper">
                <img
                  src="${recipe.image}"
                  alt="${recipe.title}"
                  class="recipe-card__image"
                  width="500"
                  height="500"
                />
              </div>
              <div class="recipe-card__info">
                <h3 class="recipe-card__title">${recipe.title}</h3>
                <ul class="recipe-card__cuisines">
                  ${recipe.category
                    .filter((item) => item !== "")
                    .map((item) => {
                      return `<li class="recipe-card__category">${item}</li>`;
                    })
                    .join(" ")}
                </ul>
                <div class="recipe-card__meta">
                  <p class="recipe-card__meta-item">
                    <svg
                      class="icon recipe-card__meta-icon"
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
                    <span>${recipe.totalTime || 0} min</span>
                  </p>
                  <p class="recipe-card__meta-item">
                    <svg
                      class="icon recipe-card__meta-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      xml:space="preserve"
                      viewBox="0 0 86 86"
                    >
                      <path
                        d="M71.2 51.2C74.1 48.8 76 45.1 76 41c0-6.9-5.6-13-12-13s-12 6.1-12 13c0 4.1 1.9 7.8 4.8 10.2q-2 .7-3.7 1.7-5.8-7-14.6-9.7C42.9 40.1 46 34.8 46 29c0-9.1-7.5-17-16-17s-16 7.9-16 17c0 5.8 3.1 11.1 7.5 14.2A30 30 0 0 0 0 72q.2 1.8 2 2h82a2 2 0 0 0 2-2 22 22 0 0 0-14.8-20.8M56 41c0-4.2 3.5-9 8-9s8 4.8 8 9-3.5 9-8 9-8-4.8-8-9M18 29c0-6.1 5.1-13 12-13s12 6.9 12 13-5.1 13-12 13-12-6.9-12-13M4.1 70a26 26 0 0 1 51.8 0zm55.8 0q-.5-7.6-4.5-13.8A18 18 0 0 1 81.9 70z"
                      />
                    </svg>
                    <span>${recipe.servings || 1}</span>
                  </p>
                  <p class="recipe-card__meta-item">
                    <svg
                      class="icon recipe-card__meta-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      xml:space="preserve"
                      viewBox="0 0 533.3 533.3"
                    >
                      <path
                        d="M165.5 533.3c-35.6-74-16.6-116.3 10.7-156.2 30-43.8 37.6-87 37.6-87s23.5 30.5 14.1 78.3c41.6-46.2 49.4-119.9 43.1-148.1 94 65.6 134.1 207.7 80 313C638.7 370.6 422.6 127 385 99.6c12.5 27.4 14.9 73.8-10.5 96.4-42.9-162.7-149-196-149-196 12.6 83.9-45.4 175.6-101.3 244.1-2-33.4-4-56.5-21.7-88.5-4 60.8-50.3 110.3-63 171.2-17 82.4 12.8 142.8 126 206.5"
                      />
                    </svg>
                    <span>${recipe.calories || 0} kcal</span>
                  </p>
                </div>
              </div>
            </a>`;
    })
    .join("")}`;
}
