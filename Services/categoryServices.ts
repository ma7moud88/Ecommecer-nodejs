import slugify from "slugify";
import asynchandler from "express-async-handler";
import { categoryModel } from "../models/categoryModel.ts";

// get all categories
export const GetCategories = asynchandler(async (req: any, res: any) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 4;
  const skip = (page - 1) * limit; // 3-1=2*5
  const categories = await categoryModel.find({}).skip(skip).limit(limit);
  res
    .status(200)
    .json({ result: categories.length, page: page, data: categories });
});
// get single category
export const GetCategory = asynchandler(async (req: any, res: any) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);
  if (!category) {
    return res.status(404).json({ msg: `No Category for this id:${id}` });
  }
  res.status(200).json({ data: category });
});
// create category
export const CreateCategory = asynchandler(async (req: any, res: any) => {
  const name = req.body.name;
  const cat = await categoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ cat });
});
// update category
export const UpdateCategory = asynchandler(async (req: any, res: any) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await categoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true },
  );
  if (!category) {
    return res.status(404).json({ msg: `No Category for this id:${id}` });
  }
  res.status(200).json({ data: category });
});
// delete category
export const DeleteCategory = asynchandler(async (req: any, res: any) => {
  const { id } = req.params;
  const category = categoryModel.findByIdAndDelete(id);
  if (!category) {
    return res.status(404).json({ msg: `No Category for this id:${id}` });
  }
  res.status(204).json({ msg: "done" });
});
