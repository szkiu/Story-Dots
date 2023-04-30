import { Schema, model } from "mongoose";

interface UserIT extends Document {
  uniqueName: string;
  username: string;
  email: string;
  password: string;
  age: number | undefined;
  image: string | undefined;
}

export interface UserNormal {
  uniqueName: string;
  username: string;
  email: string;
  password: string;
  age: number | undefined;
  image: string | undefined;
}

const userSchema = new Schema({
  uniqueName: {
    type: String,
    unique: true,
    required: [true, "uniqueName can't be blank"],
    minlength: 6,
    maxlength: 16,
    trim: true,
    lowercase: true,
    index: true,
  },
  username: {
    type: String,
    required: [true, "username can't be blank"],
    minlength: 4,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "email can't be blank"],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password can't be blank"],
    minlength: 8,
  },
  age: {
    type: Number,
    required: [true, "age can't be blank"],
    min: 12,
    max: 100,
  },
  image: String,
});

export const User = model<UserIT>("User", userSchema);
