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
openAddDish.onclick = function() {
  addDishForm.style.display = "block";
}
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

function addDish(name, day) {
  calendar.push({name, day});
  alert("fewhju");
  renderMeals();
}
function addRecipe(name, cost) {
  recipes.push({ name, cost });
  renderRecipes();
}

function showRecipe(index) {
    const recipe = recipes[index];
    alert(`${recipe.name}\nCost: $${recipe.index}`);
} 