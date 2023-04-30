"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    author: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    authorId: {
        type: String,
        required: true,
        index: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 40,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 50,
        maxlength: 3000,
    },
    category: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: true,
    },
    image_url: String,
    time: {
        type: Date,
        default: Date.now,
    },
    price: {
        type: Number,
        required: true,
        min: 50,
        max: 999999999,
    }
});
exports.Product = (0, mongoose_1.model)("Product", ProductSchema);
