import { Schema, model } from "mongoose";

const schemaCategories = new Schema({
    name: {
        type: String,
        require: true
    },
},{
    timestamps: true
})

export default model('Category', schemaCategories);