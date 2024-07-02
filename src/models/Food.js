import { Schema, model } from "mongoose";

const schemaFood = new Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    description: {
        type: String,
        default: "Sin descripción",
    },
    idCategory: {
        type: String,
        require: true
    },
    stateFood: {
        type: Boolean,
        default: true
    },
},{
    timestamps: true
})

export default model('Food', schemaFood);