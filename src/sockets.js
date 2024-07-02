import Category from './models/Categories'
import Food from './models/Food'

export default (io) =>{
    io.on('connection', (socket)=>{

                // Main Emits
                const emitFoodMain = async ()=>{
                    const food = await Food.find();
                    const categories = await Category.find();
                    
                    io.emit('server:loadFoodAndCategories', { food, categories });
                }
                emitFoodMain();

        // Categories
        const emitCategories = async ()=>{
            const categories = await Category.find();

            io.emit('server:loadcategories', categories);
        }
        emitCategories();

        socket.on('client:newcategory', async (data) => {
            try {
                const newCategories = new Category(data);
                const savedCategory = await newCategories.save();
                io.emit('server:newcategory', savedCategory);
                io.emit('server:newcategorymain', savedCategory);
                io.emit('server:success', 'Categoría guardada exitosamente'); // Emit success message
            } catch (error) {
                io.emit('server:error', 'No se pudo guardar la categoría'); // Emit error message
            }
        })

        socket.on('client:deletecategory', async (id) =>{
            await Category.findByIdAndDelete(id);
            emitFoodMain();
            emitCategories();
        })

        socket.on('client:getcategory', async (id) =>{
            const category = await Category.findById(id);
            io.emit('server:selectedcategory', category)
        })

        socket.on('client:updatecategory', async (updatedCategory) =>{
            const category = await Category.findByIdAndUpdate(updatedCategory._id, {
                name: updatedCategory.name
            });
            emitFoodMain();
            emitCategories();
        })

        // Food
        const emitFood = async ()=>{
            const food = await Food.find();

            io.emit('server:loadfood', food);
        }
        emitFood();
        socket.on('client:newfood', async (data) => {
            try {
                const newFood = new Food(data);
                const savedFood = await newFood.save();
                io.emit('server:newfood', savedFood);
                io.emit('server:newfoodmain', savedFood);
                io.emit('server:success', 'Plato guardado exitosamente'); // Emit success message
            } catch (error) {
                io.emit('server:error', 'No se pudo guardar el plato'); // Emit error message
            }
        })
        socket.on('client:deletefood', async (id) =>{
            await Food.findByIdAndDelete(id);
                emitFoodMain();
            emitFood();
        })

        socket.on('client:getfood', async (id) =>{
            const food = await Food.findById(id);
            io.emit('server:selectedfood', food)
        })

        socket.on('client:updatefood', async (updatedFood) =>{
            const food = await Food.findByIdAndUpdate(updatedFood._id, {
                name: updatedFood.name,
                price: updatedFood.price,
                category: updatedFood.category,
                description: updatedFood.description,
                lineThrough: updatedFood.lineThrough,
                stateFood: updatedFood.stateFood
            });
            emitFoodMain();
            emitFood();
        })
        socket.on('client:updateStateFood', async (updatedFood) =>{
            const food = await Food.findByIdAndUpdate(updatedFood._id, {
                lineThrough: updatedFood.classLineThrough,
                stateFood: updatedFood.stateFood
            });
            const foodUpdate = await Food.findById(updatedFood._id);
            io.emit('server:foodUpdated', foodUpdate);

            emitFoodMain();
            // emitFood();
        })
    })
}
