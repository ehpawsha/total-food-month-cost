// Get a reference to the container where you want to add the elements
const calendarContainer = document.getElementById("divCalendar");
// Loop to create multiple div and p elements
for (let i = 1; i < 31; i++) { // This loop will create 5 sets of div and p
    // Create a new div element
    const dayDiv = document.createElement('div');
    const newDiv = document.createElement('div');
    const newBtn = document.createElement(`btn`);
    const divCost = document.createElement(`cost`);
    

    // Set attributes for the div
    dayDiv.setAttribute(`class`, `day`);
    newDiv.setAttribute('id', 'day-${i}');
    newDiv.setAttribute('class', 'day-number');
    newBtn.setAttribute(`class`,` dot`);
    newBtn.setAttribute(`onclick`, `showRecipe(${i})`);
    divCost.setAttribute(`class`, `cost`);

    newDiv.innerHTML = `${i}`;
    newBtn.innerHTML = `•`;
    divCost.innerHTML= `${i}`;
    dayDiv.appendChild(newDiv);
    dayDiv.appendChild(newBtn);
    dayDiv.appendChild(divCost);
    calendarContainer.appendChild(dayDiv);
}


let calendar = JSON.parse(localStorage.getItem("calendar")) || [];
  let dailyTotal;
  let monthTotal = 933;
  document.getElementById("monthlyTotal").innerHTML = monthTotal;
const dayContainer = document.querySelector(".dot-container");
const mealForm     = document.getElementById("dishForm");
const dayInput     = document.getElementById("dishDate");
const dishInput    = document.getElementById("dishName");

  // --- Load existing recipes or start fresh
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  const container = document.querySelector(".recipe-container"); 
  const form      = document.getElementById("recipeForm"); 
  const nameInput = document.getElementById("recipeName"); 
  const foodInput = document.getElementById("recipeFood");
  const costInput = document.getElementById("recipeCost");

  function renderMeals() {
    calendar.forEach((day, index) => {
      const coloredDot = document.createElement("button");
      coloredDot.innerHTML = `
      <button id="day-1">•${index}</button>
      <p>${day.name}</p>
      `;
      dayContainer.appendChild(coloredDot);
    });
  }

  function renderRecipes() {
    recipes.forEach((recipe, index) => {
      const card = document.createElement("div");
      card.className = "recipe-card";
      card.innerHTML = `
        <div class="day-number">${recipe.name}</div>
        <div class="dot-container">
          <button class="dot" onclick="showRecipe(${index})">•</button>
        </div>  
        <img src="caramelFrap.jpg" alt="Starbucks Caramel Frapuccino">
        <ul>
              <li>${recipe.ingredients}</li>
              <li>${index}</li>
              <li>Soda</li>
        </ul>
        <hr>
        <div class="cost">${recipe.cost}</div> 
        </div>
      `;
      container.appendChild(card);
    });
  }

console.log(mealForm); // should NOT be null now
  mealForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const day = parseFloat(dayInput.value); 
    const name =  dishInput.value.trim(); //changed from nameinput to dishinput
    

    if (name && !isNaN(day)) {
      calendar.push({day, name});
      localStorage.setItem("calendar", JSON.stringify(calendar));
      renderMeals();
      mealForm.reset();
    }
  });

  // Add a new recipe
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const cost = parseFloat(costInput.value);
    const ingredients = foodInput.value.trim();

    if (name && !isNaN(cost)) {
      recipes.push({ name, cost, ingredients});
      localStorage.setItem("recipes", JSON.stringify(recipes));
      renderRecipes();
      form.reset();
    }
  });

function addDish(name, day) {
  calendar.push({name, day});
  alert("fewhju");
  renderMeals();
 }
/*
function addRecipe(name, cost) {
  recipes.push({ name, cost });
  renderRecipes(); // rebuild cards

  // Example: clicking the dot to view a popup
  function showRecipe(index) {
    const recipe = recipes[index];
    alert(`${recipe.name}\nCost: $${recipe.index}`);
  } 
  /*
  function showCalendar(index) {
    const day = calendar[index];
    alert(`${day.name}\nCost: $${day.index}`);
  }  */

//MODALS
var modal = document.getElementById("myModal");
var addRecipeForm = document.getElementById("recipeModal");
var addDishForm = document.getElementById("dishModal"); 

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var openAddRecipe = document.getElementById("addBtn");
var openAddDish = document.getElementById("openDishForm");

// Get the <span> element that closes the modal
var closeModal = document.getElementById("span");
var closeRecipe = document.getElementById("recipeSpan");
var closeMeal = document.getElementById("dishSpan");


// When the user clicks the button, open the modal 
btn.onclick = function() { 
  modal.style.display = "block";
}
openAddDish.onclick = function() {
  addDishForm.style.display = "block";
}

// When the user clicks the button, open the FORM modal 
openAddRecipe.onclick = function() {
  addRecipeForm.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
  modal.style.display = "none";
}
  closeRecipe.onclick = function() {
  addRecipeForm.style.display = "none";
  }
  closeMeal.onclick = function(){
  addDishForm.style.display = "none";
  }

// Load
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == addRecipeForm) {
    addRecipeForm.style.display = "none";
  }
  if (event.target == addDishForm) {
    addDishForm.style.display = "none";
  }
}

  // Initial render
  
renderRecipes();
//renderMeals();