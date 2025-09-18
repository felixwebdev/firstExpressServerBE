import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: {type: String, required: true},
    password: { type: String, required: true },
}, {timestamps: true});

export const Person = mongoose.model('Person', personSchema);