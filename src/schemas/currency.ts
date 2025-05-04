import mongoose from "mongoose"

const currencySchema = new mongoose.Schema({
    currency: String,
    rate: Number,
    date: String
})

export const Currency = mongoose.model('Currency', currencySchema);