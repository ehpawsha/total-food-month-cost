  const validFruits = ["Apple", "Banana", "Cherry"];
  const input = document.getElementById("recipeFood");

  input.addEventListener("change", () => {
    if (!validFruits.includes(input.value)) {
      alert("Please choose a valid fruit!");
      input.value = "";
    }
  });

 //Initalize all dom data 
  let calendar = JSON.parse(localStorage.getItem("calendar")) || []; 
  const calendarContainer = document.getElementById("divCalendar");
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
  let costInput = document.getElementById("recipeCost");
  const recipeList = document.getElementById("meals");

  const totals = {};
  for (let i = 1; i <= 30; i++) {
    totals[i] = 0;
  }
  let total = 0;
  const monthTotal = document.getElementById("monthlyTotal");

for (let i = 1; i <= 30; i++) { 
    const dayDiv = document.createElement('div');
    const newDiv = document.createElement('div');
    const dotContainer = document.createElement('div');
    const divCost = document.createElement(`div`);
    
    dayDiv.setAttribute(`class`, `day`);
    dayDiv.id = `day-container-${i}`;
    newDiv.id = `day-${i}`;
    newDiv.setAttribute('class', 'day-number');
    dotContainer.setAttribute(`class`, `dot-container`);
    dotContainer.id = `dot-container-${i}`;
    divCost.setAttribute(`class`, `cost`);
    divCost.id = `day-total-${i}`;

    divCost.innerHTML = 0;
    newDiv.innerHTML = `${i}`;
    divCost.innerHTML= `${i}`;
    dayDiv.appendChild(newDiv);
    dayDiv.appendChild(dotContainer);
    dayDiv.appendChild(dotContainer);
    dayDiv.appendChild(divCost);
    calendarContainer.appendChild(dayDiv);
  }


  //DELETE RECIPE ITEM 
  function deleteRecipes() {
    //deletes all recipe cards no selection picked 
    for (i = 0; i < recipes.length; i++) {
      const card = document.getElementById(`recipeCard${i}`);
      const options = document.getElementById(`recipe-option-${i}`);   
      if (card) {card.remove();}
      options.remove();
    }  
    //delete dom data for calendar data 
    for (let i = 1; i <= 31; i++) {
      const container = document.getElementById(`dot-container-${i}`);
    if (container) container.innerHTML = "";
    }
    //delete memory data for both array 
    localStorage.removeItem("calendar"); 
    localStorage.removeItem("recipes"); 
    recipes = [];
    calendar = [];
    monthTotal = 0;
  }  

function renderCalendar() {
  // STEP 1: Clear ALL dom data for calendar 
  for (let i = 1; i <= 30; i++) {
    const container = document.getElementById(`dot-container-${i}`);
    if (container) container.innerHTML = "";
  }
  for (let i = 1; i <= 30; i++) {
    totals[i] = 0;
  }
  // STEP 2: Re-add dots based on calendar array and going thru it 
  calendar.forEach((meal, index) => {
    const container = document.getElementById(`dot-container-${meal.day}`);
    if (!container) return;
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.textContent = "•";
    dot.setAttribute("onclick", `showRecipe(${index})`);
    container.appendChild(dot);
       totals[meal.day] += meal.price;  
  }); 
  //add to a completely new original amount 
  total = 0;
  for (let i = 1; i <= 30; i++) {
    const element = document.getElementById(`day-total-${i}`);
    element.innerHTML = `${totals[i]}`; 
      
    total += totals[i];
  }  
    monthTotal.innerHTML = `${total}`;
}

  function renderRecipes() {
    recipes.forEach((recipe, index) => {
    for (i = 0; i < recipes.length; i++) {
      const card = document.getElementById(`recipeCard${i}`);
      if (card) card.remove();
    }
      const card = document.createElement("div");
      const recipeOption = document.createElement("option");
      recipeOption.className = "recipeOptionClass";
      recipeOption.id = `recipe-option-${index}`;
      recipeOption.innerHTML = `
      <option value="${recipe.name}">
      `;
      card.className = "recipe-card";
      card.id = `recipeCard${index}`;
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
      recipeList.appendChild(recipeOption);
      container.appendChild(card);
    });
  }

  // Add a new meal to calendar 
  mealForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const day = parseFloat(dayInput.value); 
    const name =  dishInput.value.trim(); 
    const recipe = recipes.find(r => r.name === name);
    const price = recipe ? recipe.cost : 0;
    if (name && !isNaN(day)) {
      calendar.push({day, name, price});
      localStorage.setItem("calendar", JSON.stringify(calendar));
      renderCalendar();
      //mealForm.reset();
    }
  });

  // Add a new recipe
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const cost = parseFloat(costInput.value);
    const ingredients = foodInput.value.trim();

    if (name && !isNaN(cost)) {
      recipes.push({name, cost, ingredients});
      localStorage.setItem("recipes", JSON.stringify(recipes));
      renderRecipes();
      form.reset();
    }
  });

renderRecipes();
renderCalendar();