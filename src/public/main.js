import { loadCategories, onNewCategory, selectedCategory, loadCategoriesMain, onNewCategoryMain } from "./socket.js";
import { onHandleSubmit, renderCategories, appendCategory, fillFormCategory, renderCategoriesMain, appendCategoryMain } from "./ui.js";

// Admin screen
onNewCategory(appendCategory);
loadCategories(renderCategories);
selectedCategory(fillFormCategory);

// Main screen
onNewCategoryMain(appendCategoryMain);
loadCategoriesMain(renderCategoriesMain);

const categoryForm = document.querySelector("#categoriesForm");
categoryForm.addEventListener('submit', onHandleSubmit);