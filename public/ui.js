import { saveCategory, deleteCategory, getCategory, updateCategory } from "./socket.js";

const categoriesList = document.querySelector("#categories");
const categoryInput = document.querySelector('#name');

const categoriesListMain = document.querySelector("#categorysMenu");

let saveId = "";

const categoryUI = category =>{
    const div = document.createElement('div')
    div.innerHTML = `
        <div>
            <h1>${category.name}</h1>
            <button class="delete" data-id="${category._id}">Delete</button>
            <button class="update" data-id="${category._id}">Update</button>
        </div>
    `

    const btnDelete = div.querySelector('.delete');
    const btnUpdate = div.querySelector('.update');

    btnDelete.addEventListener('click', e => deleteCategory(btnDelete.dataset.id))
    btnUpdate.addEventListener('click', e => getCategory(btnUpdate.dataset.id))

    return div;
}

export const renderCategories = categories =>{
    categoriesList.innerHTML = "";
    categories.forEach(category => categoriesList.append(categoryUI(category)));
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

export const appendCategory = category =>{
    categoriesList.append(categoryUI(category))
}

export const fillFormCategory = category => {
    categoryInput.value = category.name;
    saveId = category._id;
}


const categoryUIMain = category =>{
    const div = document.createElement('div')
    div.innerHTML = `
        <div>
            <h1>${category.name}</h1>
        </div>
    `
    return div;
}

export const renderCategoriesMain = categories =>{
    categoriesListMain.innerHTML = "";
    categories.forEach(category => categoriesListMain.append(categoryUIMain(category)));
}

export const appendCategoryMain = category =>{
    categoriesListMain.append(categoryUIMain(category))
}