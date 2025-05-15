import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  address: { type: String, required: true }
});

export const Store = mongoose.model('Store', storeSchema);
