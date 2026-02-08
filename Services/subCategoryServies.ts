import asynchandler from "express-async-handler";
import slugify from "slugify";
import { subCategoryModel } from "../models/subCategoryModel.ts";
import ApiError from "../utils/apierror.ts";

// create subCategory
export const CreateSubCategory = asynchandler(async (req: any, res: any) => {
  const name = req.body.name;
  const category = req.body.category;
  const subCate = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCate });
});

// get all subcategory
export const GetsubCategories = asynchandler(async (req: any, res: any) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 4;
  const skip = (page - 1) * limit; // 3-1=2*5
  const categories = await subCategoryModel
    .find({})
    .skip(skip)
    .limit(limit)
    .populate("category");
  res
    .status(200)
    .json({ result: categories.length, page: page, data: categories });
});

// get single subcategory
export const GetsubCategory = asynchandler(
  async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const category = await subCategoryModel.findById(id);
    if (!category) {
      return next(new ApiError({ msg: `No Category for this id:${id}` }, 404));
    }
    res.status(200).json({ data: category });
  },
);

// update subCategory
export const UpdatesubCategory = asynchandler(
  async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const { name, category } = req.body;
    const Category = await subCategoryModel.findOneAndUpdate(
      { _id: id },
      { name: name, slug: slugify(name), category },
      { new: true },
    );
    if (!Category) {
      return next(new ApiError({ msg: `No Category for this id:${id}` }, 404));
    }
    res.status(200).json({ data: Category });
  },
);
// delete subCategory
export const DeletesubCategory = asynchandler(
  async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const Subcategory = await subCategoryModel.findByIdAndDelete(id);
    if (!Subcategory) {
      return next(new ApiError({ msg: `No Category for this id:${id}` }, 404));
    }
    res.status(200).json({ msg: "Done" });
  },
);
