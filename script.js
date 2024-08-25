let recipesContainer = document.querySelector("#recipesContainer");
let recipeTitle = document.querySelector("#title");
let cookingTime = document.querySelector("#time");
let ingredients = document.querySelector("#ingredients");
let recipeForm = document.querySelector("#recipeForm");
const imageFile = document.querySelector("#image");

recipeForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (imageFile.files.length === 0) {
    alert("Please select an image file.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const imgSource = e.target.result;

    const recipeContent = `
      <figure>
        <img src="${imgSource}" alt="image of dish" />
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
    imageFile.value = "";

    const imgBetyg = recipeCard.querySelector("#imgBetyg");
    const counter = recipeCard.querySelector("#counter");
    const stars = recipeCard.querySelectorAll(".imgstarempty");

    let clickCount = 0;
    let filledStar = 0;

    imgBetyg.addEventListener("click", function () {
      console.log("you clicked thumbs up");
      clickCount++;
      counter.textContent = clickCount;

      if (clickCount % 2 === 0 && filledStar < stars.length) {
        stars[filledStar].src = "./img/starblack.png";
        filledStar++;
      }
    });

    recipeCard.querySelector("#editBtn").addEventListener("click", function () {
      enterEditMode(recipeCard);
    });

    recipeCard
      .querySelector("#deleteBtn")
      .addEventListener("click", function () {
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

      recipeCard
        .querySelector(".saveBtn")
        .addEventListener("click", function () {
          saveRecipe(recipeCard);
        });
    }

    function saveRecipe(recipeCard) {
      let updatedTitle = recipeCard.querySelector(".editRecipeTitle").value;
      let updatedCookingTime =
        recipeCard.querySelector(".editCookingTime").value;
      let updatedIngredients =
        recipeCard.querySelector(".editIngredients").value;

      recipeCard.innerHTML = `
        <figure>
          <img src="${imgSource}" alt="image of dish" />
        </figure>
        <h2 class="recipeTitle">${updatedTitle}</h2>
        <h3 class="cookingTime">${updatedCookingTime}</h3>
        <p class="ingredients">${updatedIngredients}</p>
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

      recipeCard
        .querySelector("#editBtn")
        .addEventListener("click", function () {
          enterEditMode(recipeCard);
        });

      recipeCard
        .querySelector("#deleteBtn")
        .addEventListener("click", function () {
          recipeCard.remove();
        });
    }
  };

  reader.readAsDataURL(imageFile.files[0]);
});
