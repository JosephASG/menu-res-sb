const socket = io();

export const loadCategories = (callback)=>{
    socket.on('server:loadcategories', callback)
}

export const loadCategoriesMain = (callback)=>{
    socket.on('server:loadcategoriesmain', callback)
}

export const saveCategory = (name) =>{
    socket.emit('client:newcategory', {name})
}

export const onNewCategory = (callback) => {
    socket.on('server:newcategory', callback);
}

export const onNewCategoryMain = (callback) => {
    socket.on('server:newcategorymain', callback);
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