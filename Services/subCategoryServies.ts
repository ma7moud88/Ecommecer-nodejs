import expressAsyncHandler from "express-async-handler";
import slugify from "slugify";
import { subCategoryModel } from "../models/subCategoryModel.ts";

// create subCategory
export const CreateSubCategory = expressAsyncHandler(
  async (req: any, res: any) => {
    const name = req.body.name;
    const category = req.body.category;
    const subCate = await subCategoryModel.create({
      name,
      slug: slugify(name),
      category,
    });
    res.status(201).json({ data: subCate });
  },
);
