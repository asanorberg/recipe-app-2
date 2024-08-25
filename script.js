// <------ Åsa ------>
let recipesContainer = document.querySelector("#recipesContainer");
let recipeTitle = document.querySelector("#title");
let cookingTime = document.querySelector("#time");
let ingredients = document.querySelector("#ingredients");
let recipeForm = document.querySelector("#recipeForm");

recipeForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const recipeContent = `
    <figure>
      <img src="img/Recept1.png" alt="image of dish" />
    </figure>
    <h2 class="recipeTitle">${recipeTitle.value}</h2>
    <h3 class="cookingTime">${cookingTime.value}</h3>
    <p class="ingredients">${ingredients.value}</p>
    <div class="betyg">
      <div class="div1">
        <button class="betygButton">
          <img id="imgBetyg" src="./img/8530677_thumbs_up_icon.png" alt="betyg" />
        </button>
        <span id="counter">0</span>
      </div>
      <div class="div2">
        <img class="imgstarempty" src="./img/starempty.png" alt="betyg" />
        <img class="imgstarempty" src="./img/starempty.png" alt="betyg" />
        <img class="imgstarempty" src="./img/starempty.png" alt="betyg" />
        <img class="imgstarempty" src="./img/starempty.png" alt="betyg" />
        <img class="imgstarempty" src="./img/starempty.png" alt="betyg" />
      </div>
    </div>
    <button id="editBtn">Edit</button>
    <button id="deleteBtn">Delete</button>
  `;

  let recipeCard = document.createElement("article");
  recipeCard.classList.add("recipeCard");
  recipeCard.innerHTML = recipeContent;
  recipesContainer.appendChild(recipeCard);

  recipeTitle.value = "";
  cookingTime.value = "";
  ingredients.value = "";

  // <------ Helena ------>

  let clickCount = 0;
  let filledStar = 0;

  function updateStarsAndCounter() {
    const imgBetyg = recipeCard.querySelector("#imgBetyg");
    const counter = recipeCard.querySelector("#counter");
    const stars = recipeCard.querySelectorAll(".imgstarempty");

    imgBetyg.addEventListener("click", function () {
      clickCount++;
      counter.textContent = clickCount;

      if (clickCount % 2 === 0 && filledStar < stars.length) {
        stars[filledStar].src = "./img/starblack.png";
        filledStar++;
      }
    });
  }

  updateStarsAndCounter();

  // <------ Ulf ------>

  recipeCard.querySelector("#editBtn").addEventListener("click", function () {
    enterEditMode(recipeCard);
  });

  recipeCard.querySelector("#deleteBtn").addEventListener("click", function () {
    recipeCard.remove();
  });

  function enterEditMode(recipeCard) {
    let currentTitle = recipeCard.querySelector(".recipeTitle").textContent;
    let currentCookingTime =
      recipeCard.querySelector(".cookingTime").textContent;
    let currentIngredients =
      recipeCard.querySelector(".ingredients").textContent;

    recipeCard.innerHTML = `
      <label>Title:</label><br />
      <input class="editRecipeTitle" type="text" value="${currentTitle}" /><br />
      <label>Time:</label><br />
      <input class="editCookingTime" type="text" value="${currentCookingTime}" /><br />
      <label>Ingredients:</label><br />
      <textarea class="editIngredients" rows="4" cols="50">${currentIngredients}</textarea><br />
      <button class="saveBtn">Save</button>
    `;

    recipeCard.querySelector(".saveBtn").addEventListener("click", function () {
      saveRecipe(recipeCard);
    });
  }

  function saveRecipe(recipeCard) {
    let updatedTitle = recipeCard.querySelector(".editRecipeTitle").value;
    let updatedCookingTime = recipeCard.querySelector(".editCookingTime").value;
    let updatedIngredients = recipeCard.querySelector(".editIngredients").value;

    recipeCard.innerHTML = `
      <figure>
        <img src="img/Recept1.png" alt="image of dish" />
      </figure>
      <h2 class="recipeTitle">${updatedTitle}</h2>
      <h3 class="cookingTime">${updatedCookingTime}</h3>
      <p class="ingredients">${updatedIngredients}</p>
      <div class="betyg">
        <div class="div1">
          <button class="betygButton">
            <img id="imgBetyg" src="./img/8530677_thumbs_up_icon.png" alt="betyg" />
          </button>
          <span id="counter">${clickCount}</span>
        </div>
        <div class="div2">
          ${Array.from({ length: 5 }, (_, i) =>
            i < filledStar
              ? `<img class="imgstarempty" src="./img/starblack.png" alt="betyg" />`
              : `<img class="imgstarempty" src="./img/starempty.png" alt="betyg" />`
          ).join("")}
        </div>
      </div>
      <button id="editBtn">Edit</button>
      <button id="deleteBtn">Delete</button>
    `;

    // Återställ event listeners och uppdateringslogik
    updateStarsAndCounter();

    recipeCard.querySelector("#editBtn").addEventListener("click", function () {
      enterEditMode(recipeCard);
    });

    recipeCard
      .querySelector("#deleteBtn")
      .addEventListener("click", function () {
        recipeCard.remove();
      });
  }
});
