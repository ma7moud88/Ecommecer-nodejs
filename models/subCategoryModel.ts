import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, // remove any more spaces
      unique: [true, "subCategory must be unique"],
      minlength: [2, "to short subCategory name"],
      maxlength: [32, "to long subcategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must be belong to parent category"],
    },
  },
  { timestamps: true },
);

// create model schema
export const subCategoryModel = mongoose.model(
  "subCategory",
  subCategorySchema,
);
