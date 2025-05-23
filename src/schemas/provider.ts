import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact_email: { type: String, required: true}
});

export const Provider = mongoose.model('Provider', providerSchema);
