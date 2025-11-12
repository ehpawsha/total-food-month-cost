  const validFruits = ["Apple", "Banana", "Cherry"];
  const input = document.getElementById("recipeFood");

  input.addEventListener("change", () => {
    if (!validFruits.includes(input.value)) {
      alert("Please choose a valid fruit!");
      input.value = "";
    }
  });

// Get a reference to the container where you want to add the elements
const calendarContainer = document.getElementById("divCalendar");

// Loop to create multiple div and p elements
for (let i = 1; i < 31; i++) { // This loop will create 5 sets of div and p
    // Create a new div element
    const dayDiv = document.createElement('div');
    const newDiv = document.createElement('div');
    const dotContainer = document.createElement('div');
    const divCost = document.createElement(`div`);
    

    // Set attributes for the div
    dayDiv.setAttribute(`class`, `day`);
    dayDiv.id = `day-container-${i}`;
    newDiv.id = `day-${i}`;
    newDiv.setAttribute('class', 'day-number');
    dotContainer.setAttribute(`class`, `dot-container`);
    dotContainer.id = `dot-container-${i}`;
    divCost.setAttribute(`class`, `cost`);

    newDiv.innerHTML = `${i}`;
    divCost.innerHTML= `${i}`;
    dayDiv.appendChild(newDiv);
    dayDiv.appendChild(dotContainer);
    dayDiv.appendChild(dotContainer);
    dayDiv.appendChild(divCost);
    calendarContainer.appendChild(dayDiv);
}


let calendar = JSON.parse(localStorage.getItem("calendar")) || []; 
localStorage.removeItem("calendar"); localStorage.removeItem("recipes");


  let dailyTotal;


const dayContainer = document.querySelector(".dot-container");
const mealForm     = document.getElementById("dishForm");
const dayInput     = document.getElementById("dishDate");
const dishInput    = document.getElementById("dishName");

  function renderMeals() {
    calendar.forEach((meal, index) => {
      const coloredDot = document.createElement("button");
      const recipeNumber = `showRecipe(${index})`;
      coloredDot.setAttribute('onclick', recipeNumber);
      coloredDot.textContent = "•";
      coloredDot.setAttribute('class', 'dot');
      const dayIndex = `#dot-container-${meal.day}`; 
      const dayDiv = document.querySelector(dayIndex); console.log(dayDiv);
      
      dayDiv.appendChild(coloredDot); 
    }); 
      let monthTotal = 933;
  document.getElementById("monthlyTotal").innerHTML = monthTotal;
  }

  // --- Load existing recipes or start fresh${index}
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  const container = document.querySelector(".recipe-container"); 
  const form      = document.getElementById("recipeForm"); 
  const nameInput = document.getElementById("recipeName"); 
  const foodInput = document.getElementById("recipeFood");
  const costInput = document.getElementById("recipeCost");

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
 function addRecipe(name, cost) {
  recipes.push({ name, cost });
  renderRecipes(); // rebuild cards
 }

   function showRecipe(index) {
    const recipe = recipes[index];
    alert(`${recipe.name}\nCost: $${recipe.index}`);
  } 

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
renderMeals();