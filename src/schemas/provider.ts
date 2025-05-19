import mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail';

const providerSchema = new mongoose.Schema({
    _id: { type: String },
    name: { type: String, required: true },
    contact_email: { type: String, required: true, validate: {validator: (v: string) => isEmail(v)}}
});

export const Provider = mongoose.model('Provider', providerSchema);
