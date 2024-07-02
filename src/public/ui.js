import { saveCategory, deleteCategory, getCategory, updateCategory, saveFood, deleteFood, updateFood, getFood } from "./socket.js";

const categoriesList = document.querySelector("#categories");
const categoriesListView = document.querySelector("#categoriesView");
const categoryInput = document.querySelector('#name');

const categoriesListMain = document.querySelector("#categorysMenu");

let saveId = "";
let saveIdFood = "";

const categoryUI = category =>{
    const div = document.createElement('div')
    div.innerHTML = `
        <div class="border-white/50 bg-[#0a0a0a] p-4 rounded-md w-full flex justify-between items-center mt-2">
            <h1 class="flex justify-center items-center"><i class='bx bx-category text-xl mr-2'></i>${category.name}</h1>
            <div class="flex justify-center items-center">
                <button class="delete mr-2" data-id="${category._id}"><i class="fa-solid fa-trash-can"></i></button>
                <button class="update" data-id="${category._id}"><i class="fa-regular fa-pen-to-square"></i></button>
            </div>
        </div>
    `

    const btnDelete = div.querySelector('.delete');
    const btnUpdate = div.querySelector('.update');

    btnDelete.addEventListener('click', e => deleteCategory(btnDelete.dataset.id))
    btnUpdate.addEventListener('click', e => getCategory(btnUpdate.dataset.id))

    return div;
}
const categoryViewUI = category =>{
    const div = document.createElement('div')
    div.innerHTML = `
        <div class="border-white/50 bg-[#0a0a0a] p-4 rounded-md w-full flex justify-between items-center mt-2">
            <h1 class="flex justify-center items-center"><i class='bx bx-category text-xl mr-2'></i>${category.name}</h1>
            <i class="fa-solid fa-circle-check text-[#6C8F2B]"></i>
        </div>
    `
    return div;
}

const categoryForFoodUI = category =>{
    const option = document.createElement('option')
    option.value = category.name;
    option.innerText = category.name;
    return option;
}

export const renderCategories = categories =>{
    categoriesList.innerHTML = "";
    categoriesListDropdown.innerHTML = "";
    categoriesListView.innerHTML = "";
    categories.forEach(category => categoriesList.append(categoryUI(category)));
    categories.forEach(category => categoriesListView.append(categoryViewUI(category)));
    categories.forEach(category => categoriesListDropdown.append(categoryForFoodUI(category)));
}

export const appendCategory = category =>{
    categoriesList.append(categoryUI(category))
    categoriesListView.append(categoryViewUI(category))
    categoriesListDropdown.append(categoryForFoodUI(category))
}

export const onHandleSubmit = (e)=>{
    e.preventDefault();
    if(saveId){
        updateCategory(saveId, categoryInput.value);
    } else {
        saveCategory(categoryInput.value);
    }

    saveId = "";
    categoryInput.value = "";
}

export const fillFormCategory = category => {
    categoryInput.value = category.name;
    saveId = category._id;
}

// FOOD //
const foodList = document.querySelector("#food");
const foodListView = document.querySelector("#foodView");
const nameFood = document.querySelector("#nameFood");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const categoriesListDropdown = document.querySelector("#categoriesforfood");

const foodUI = food =>{
    const div = document.createElement('div')
    div.innerHTML = `
        <div class="border-white/50 bg-[#0a0a0a] p-4 rounded-md w-full flex justify-between items-center mt-2">
            <ul class="flex w-full justify-between items-center">
                <li class="flex justify-center items-center"><i class="fa-solid fa-bowl-food mr-2"></i>${food.name}</li>
                <li class="flex justify-center items-center"><i class="fa-solid fa-dollar-sign mr-2"></i>${food.price}</li>
                <li class="flex justify-center items-center"><i class='bx bx-category text-xl mr-2'></i>${food.category}</li>
            </ul>
            <div class="flex justify-center items-center pl-12">
                <button class="deleteFood mr-2" data-id="${food._id}"><i class="fa-solid fa-trash-can"></i></button>
                <button class="updateFood" data-id="${food._id}"><i class="fa-regular fa-pen-to-square"></i></button>
            </div>
        </div>
    `

    const btnDelete = div.querySelector('.deleteFood');
    const btnUpdate = div.querySelector('.updateFood');

    btnDelete.addEventListener('click', e => deleteFood(btnDelete.dataset.id))
    btnUpdate.addEventListener('click', e => getFood(btnUpdate.dataset.id))

    return div;
}

const foodViewUI = food =>{
    const div = document.createElement('div')
    div.innerHTML = `
        <div class="border-white/50 bg-[#0a0a0a] p-4 rounded-md w-full flex justify-between items-center mt-2">
            <ul class="flex w-full justify-between items-center">
                <li class="flex justify-center items-center"><i class="fa-solid fa-bowl-food mr-2"></i>${food.name}</li>
                <li class="flex justify-center items-center"><i class="fa-solid fa-dollar-sign mr-2"></i>${food.price}</li>
                <li class="flex justify-center items-center"><i class='bx bx-category text-xl mr-2'></i>${food.category}</li>
            </ul>
            <i class="fa-solid fa-circle-check text-[#6C8F2B] pl-12"></i>
        </div>
    `
    return div;
}
export const renderFood = food =>{
    foodList.innerHTML = "";
    foodListView.innerHTML = "";
    food.forEach(foodItem => foodList.append(foodUI(foodItem)));
    food.forEach(foodItem => foodListView.append(foodViewUI(foodItem)));
}
export const appendFood = food =>{
    foodList.append(foodUI(food))
    foodListView.append(foodViewUI(food))
}
export const onHandleSubmitFood = (e)=>{
    let stateFood = true;
    e.preventDefault();
    if(saveIdFood){
        updateFood(saveIdFood, nameFood.value, price.value, categoriesListDropdown.value, description.value, saveId, stateFood);
    } else {
        saveFood(nameFood.value, price.value, categoriesListDropdown.value, description.value, saveId, stateFood);
    }

    saveIdFood = "";
    nameFood.value = "";
    price.value = "";
    description.value = "";
}

export const fillFormFood = food => {
    nameFood.value = food.name;
    price.value = food.price;
    categoriesListDropdown.value = food.category;
    description.value = food.description;
    saveIdFood = food._id;
}

// MAIN SCREEN //
let flagMainViewLoad = true;
const foodListMain = document.querySelector("#foodMenu");

const categoryUIMain = (category, foods) => {
    const div = document.createElement('div');
    div.innerHTML = `
        <div id="${category.name}" class="category-container">
            <h1>${category.name}</h1>
            <div class="food-container">
                ${foods.map(food => `<div class="food-item">${food.name}</div>`).join('')}
            </div>
        </div>
    `;
    return div;
}

export const renderCategoriesAndFoodMain = (data) => {
    const { food, categories } = data;

    // Crear un objeto para agrupar los alimentos por categorías
    const foodsByCategory = {};

    // Agrupar los alimentos según su categoría
    food.forEach(f => {
        if (!foodsByCategory[f.category]) {
            foodsByCategory[f.category] = [];
        }
        foodsByCategory[f.category].push(f);
    });

    // Renderizar las categorías con sus alimentos correspondientes
    categoriesListMain.innerHTML = ""; // Limpiar el contenedor de categorías
    categories.forEach(category => {
        const categoryFoods = foodsByCategory[category.name] || [];
        categoriesListMain.append(categoryUIMain(category, categoryFoods));
    });
}


export const appendCategoryMain = (category) => {
    if (!document.getElementById(category.name)) {
        categoriesListMain.append(categoryUIMain(category, []));
    }
}

export const appendFoodMain = (food) => {
    // Encontrar la categoría correspondiente en el DOM
    const categoryContainer = document.getElementById(food.category);
    if (categoryContainer) {
        const foodContainer = categoryContainer.querySelector('.food-container');
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item';
        foodItem.textContent = food.name;
        foodContainer.append(foodItem);
    } else {
        // Si la categoría no existe, crea una nueva categoría y añade el platillo
        const newCategory = { name: food.category };
        categoriesListMain.append(categoryUIMain(newCategory, [food]));
    }
}