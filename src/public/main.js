import { loadCategories, onNewCategory, selectedCategory, onNewCategoryMain, loadFood, onNewFood, onSuccessMessage, onErrorMessage, selectedFood, loadFoodAndCategories, onNewFoodMain, updateStateFoodMain } from "./socket.js";
import { onHandleSubmit, renderCategories, appendCategory, fillFormCategory, appendCategoryMain, renderFood, appendFood, onHandleSubmitFood, fillFormFood, renderCategoriesAndFoodMain, appendFoodMain, updateStateFoodMainUI } from "./ui.js";

// Admin screen
onNewCategory(appendCategory);
loadCategories(renderCategories);
selectedCategory(fillFormCategory);

// Food
onNewFood(appendFood);
loadFood(renderFood);
selectedFood(fillFormFood);

// Main screen // Food main
loadFoodAndCategories(renderCategoriesAndFoodMain);
onNewCategoryMain(appendCategoryMain);
onNewFoodMain(appendFoodMain);
updateStateFoodMain(updateStateFoodMainUI);

onNewCategoryMain(appendCategoryMain);
// onNewFoodMain(appendFoodMain);
// Messages success/error
onSuccessMessage();
onErrorMessage();

const categoryForm = document.querySelector("#categoriesForm");
categoryForm.addEventListener('submit', onHandleSubmit);

const foodForm = document.querySelector("#foodForm");
foodForm.addEventListener('submit', onHandleSubmitFood);