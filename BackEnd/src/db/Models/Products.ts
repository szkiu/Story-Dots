import { model, Schema, Document } from 'mongoose';

interface IProduct extends Document {
  author: string;
  authorId: string;
  name: string;
  description: string;
  category: string;
  image_url: string | undefined;
  price: number;
  time: Date;
}

const ProductSchema: Schema = new Schema({
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


export const Product = model<IProduct>("Product", ProductSchema);