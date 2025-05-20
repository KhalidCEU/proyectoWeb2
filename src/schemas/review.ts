import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
    sneakerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sneaker', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 0, max: 5, required: true},
    comment: { type: String, minLength: 0, maxLength: 80 },
    date: { type: Date, default: Date.now, required: true }
})

export const Review = mongoose.model('Review', reviewSchema);