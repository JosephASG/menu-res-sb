import { saveCategory, deleteCategory, getCategory, updateCategory, saveFood, deleteFood, updateFood, getFood, updateStateFood } from "./socket.js";

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
const foodStateView = document.querySelector("#foodStateView");
const nameFood = document.querySelector("#nameFood");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const categoriesListDropdown = document.querySelector("#categoriesforfood");

const foodUI = food =>{
    const div = document.createElement('div')
    div.innerHTML = `
        <div class="border-white/50 bg-[#0a0a0a] p-4 rounded-md w-full flex justify-between items-center mt-2 max-md:justify-center max-md:items-start max-md:flex-col">
            <ul class="flex w-full justify-between items-center max-md:flex-col max-md:justify-center max-md:items-start">
                <li class="flex justify-center items-center"><i class="fa-solid fa-bowl-food mr-2"></i>${food.name}</li>
                <li class="flex justify-center items-center"><i class="fa-solid fa-dollar-sign mr-2"></i>${food.price}</li>
                <li class="flex justify-center items-center"><i class='bx bx-category text-xl mr-2'></i>${food.category}</li>
            </ul>
            <div class="flex justify-center items-center md:pl-12 max-md:w-full max-md:border-t max-md:mt-3 max-md:py-2">
                <button class="deleteFood mr-2 max-md:rounded-sm max-md:bg-red-600 max-md:px-4 py-2" data-id="${food._id}"><i class="fa-solid fa-trash-can max-md:hidden"></i><span class="md:hidden">Eliminar</span></button>
                <button class="updateFood  max-md:border max-md:rounded-sm max-md:bg-[#0a0a0a] max-md:px-4 py-2" data-id="${food._id}"><i class="fa-regular fa-pen-to-square max-md:hidden"></i><span class="md:hidden">Editar</span></button>
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
            <ul class="flex w-full justify-between items-center max-md:flex-col max-md:justify-center max-md:items-start">
                <li class="flex justify-center items-center"><i class="fa-solid fa-bowl-food mr-2"></i>${food.name}</li>
                <li class="flex justify-center items-center"><i class="fa-solid fa-dollar-sign mr-2"></i>${food.price}</li>
                <li class="flex justify-center items-center"><i class='bx bx-category text-xl mr-2'></i>${food.category}</li>
            </ul>
            <i class="fa-solid fa-circle-check text-[#6C8F2B] pl-12"></i>
        </div>
    `
    return div;
}

const foodStateUI = food => {
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="border-white/50 bg-[#0a0a0a] p-4 rounded-md w-full flex justify-between items-center mt-2">
            <ul class="flex w-full justify-between items-center max-md:flex-col max-md:justify-center max-md:items-start">
                <li class="flex justify-center items-center"><i class="fa-solid fa-bowl-food mr-2"></i>${food.name}</li>
            </ul>
            <label class="switch">
                <input class="updatebox" data-id="${food._id}" type="checkbox" ${food.stateFood ? 'checked' : ''}>
                <span class="slider">
                <svg class="slider-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"><path fill="none" d="m4 16.5 8 8 16-16"></path></svg> 
                </span>
            </label>
        </div>
    `;

    const checkboxUpdate = div.querySelector('.updatebox');

    checkboxUpdate.addEventListener('change', e => {
        const newState = e.target.checked;
        updateStateFood(checkboxUpdate.dataset.id, newState);
    });

    return div;
}

export const renderFood = food =>{
    foodList.innerHTML = "";
    foodListView.innerHTML = "";
    foodStateView.innerHTML = "";
    food.forEach(foodItem => foodList.append(foodUI(foodItem)));
    food.forEach(foodItem => foodListView.append(foodViewUI(foodItem)));
    food.forEach(foodItem => foodStateView.append(foodStateUI(foodItem)));
}
export const appendFood = food =>{
    foodList.append(foodUI(food))
    foodListView.append(foodViewUI(food))
    foodStateView.append(foodStateUI(food))
}
export const onHandleSubmitFood = (e)=>{
    let stateFood = true;
    e.preventDefault();
    if(saveIdFood){
        updateFood(saveIdFood, nameFood.value, price.value, categoriesListDropdown.value, description.value, "", stateFood);
    } else {
        saveFood(nameFood.value, price.value, categoriesListDropdown.value, description.value, "", stateFood);
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

const categoryUIMain = (category, foods) => {
    const div = document.createElement('div');
    div.innerHTML = `
        <div id="${category.name}" class="category-container w-full h-[70vh] p-4 bg-black/30 backdrop-blur-sm">
            <h1 class="text-3xl">${category.name}</h1>
            <div class="food-container w-full">
                ${foods.map(food => `
                    <div class="food-item w-full ${food.stateFood ? '' : 'line-through'}" data-id="${food._id}">
                        <ul class="flex justify-between items-center w-full text-lg">
                            <li>${food.name}</li>     
                            <li>${food.price}<i class="fa-solid fa-dollar-sign ml-1"></i></li>                        
                        </ul>
                    </div>`).join('')}
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
        foodItem.innerHTML = `
            <ul class="flex justify-between items-center w-full text-lg">
                <li>${food.name}</li>
                <li>${food.price}<i class="fa-solid fa-dollar-sign ml-1"></i></li>
            </ul>
        `;
        foodContainer.append(foodItem);
    } else {
        // Si la categoría no existe, crea una nueva categoría y añade el platillo
        const newCategory = { name: food.category };
        categoriesListMain.append(categoryUIMain(newCategory, [food]));
    }
}
export const updateStateFoodMainUI = (updatedFood) => {
    const foodItem = document.querySelector(`[data-id='${updatedFood._id}']`);
    if (foodItem) {
        if (updatedFood.stateFood) {
            foodItem.classList.remove('line-through');
        } else {
            foodItem.classList.add('line-through');
        }
        foodItem.querySelector('.updatebox').checked = updatedFood.stateFood;
    }
}
