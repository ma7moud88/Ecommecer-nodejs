import mongoose from "mongoose";

// create schema
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category Required"],
    unique: [true, "Category must be unique"],
    minlength: [3, "too short category name"],
    maxLength: [32, "too long category name"],
  },
  image: String,
  slug: {
    type: String,
    lowercase: true,
  },
});
// create model schema
export const categoryModel = mongoose.model("Category", CategorySchema);
