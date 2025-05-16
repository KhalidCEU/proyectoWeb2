import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  address: { type: String, required: true }
});

export const Store = mongoose.model('Store', storeSchema);
