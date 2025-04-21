import mongoose from "mongoose"

const sneakerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String },
    release_date: { type: Date },
    brand: { type: String, required: true },
    modelKey: { type: String, required: true },
    size: { type: Number, required: true },
    retail_price: { type: Number, required: true },
    sales_price: { type: Number, required: true }
})

export const Sneaker = mongoose.model('Sneaker', sneakerSchema);