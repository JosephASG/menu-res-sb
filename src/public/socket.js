const socket = io();

// CATEGORÍAS //
export const loadCategories = (callback)=>{
    socket.on('server:loadcategories', callback)
}

export const saveCategory = (name) =>{
    socket.emit('client:newcategory', {name})
}

export const onNewCategory = (callback) => {
    socket.on('server:newcategory', callback);
}

export const deleteCategory = id => {
    socket.emit('client:deletecategory', id);
}

export const getCategory = id => {
    socket.emit('client:getcategory', id);
}

export const selectedCategory = callback => {
    socket.on('server:selectedcategory', callback);
}

export const updateCategory = (id, name) => {
    socket.emit('client:updatecategory', {_id: id, name});
}

// PLATILLOS //
export const loadFood = (callback)=>{
    socket.on('server:loadfood', callback)
}
export const saveFood = (name, price, category, description, idCategory, state) =>{
    socket.emit('client:newfood', {name, price, category, description, idCategory, state})
}

export const onNewFood = (callback) => {
    socket.on('server:newfood', callback);
}

export const deleteFood = id => {
    socket.emit('client:deletefood', id);
}

export const getFood = id => {
    socket.emit('client:getfood', id);
}

export const selectedFood = callback => {
    socket.on('server:selectedfood', callback);
}

export const updateFood = (id, name, price, category, description, lineThrough, stateFood) => {
    socket.emit('client:updatefood', {_id: id, name, price, category, description, lineThrough, stateFood});
}

export const updateStateFood = (id, stateFood, classLineThrough) => {
    socket.emit('client:updateStateFood', {_id: id, stateFood, classLineThrough});
}

export const updateStateFoodMain = (callback) => {
    socket.on('server:foodUpdated', (callback));
}
// MAIN
export const loadFoodAndCategories = (callback)=>{
    socket.on('server:loadFoodAndCategories', callback)
}
export const onNewCategoryMain = (callback) => {
    socket.on('server:newcategorymain', callback);
}
export const onNewFoodMain = (callback) => {
    socket.on('server:newfoodmain', callback);
}

// Messages success/error //
export const onSuccessMessage = () => {
    socket.on('server:success', (message) => {
        Toastify({
            text: message,
            duration: 3000,
            // close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: false, // Prevents dismissing of toast on hover
            close: true,
            style: {
                background: "#6C8F2B",
                borderRadius: "10px",
                cursor: "auto",
                padding: "15px 20px"
            },
        }).showToast();
    });
}

export const onErrorMessage = () => {
    socket.on('server:error', (message) => {
        Toastify({
            text: message,
            duration: 3000,
            // close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: false, // Prevents dismissing of toast on hover
            close: true,
            style: {
                background: "#D61600",
                borderRadius: "10px",
                cursor: "auto",
                padding: "15px 20px"
            },
        }).showToast();
    });
}