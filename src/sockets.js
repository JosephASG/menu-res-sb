import Category from './models/Categories'

export default (io) =>{
    io.on('connection', (socket)=>{
        const emitCategories = async ()=>{
            const categories = await Category.find();

            io.emit('server:loadcategories', categories);
            io.emit('server:loadcategoriesmain', categories);
        }
        emitCategories();

        socket.on('client:newcategory', async (data) => {
            const newCategories = new Category(data);
            const savedCategory =  await newCategories.save()
            io.emit('server:newcategory', savedCategory)
            io.emit('server:newcategorymain', savedCategory)
        })

        socket.on('client:deletecategory', async (id) =>{
            await Category.findByIdAndDelete(id);
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
            emitCategories();
        })
    })
}