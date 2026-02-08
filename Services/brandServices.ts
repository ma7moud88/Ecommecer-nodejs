import slugify from "slugify";
import asynchandler from "express-async-handler";
import { brandModel } from "../models/brendModel.ts";
import ApiError from "../utils/apierror.ts";

// get all Brands
export const GetBrands = asynchandler(async (req: any, res: any) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 4;
  const skip = (page - 1) * limit; // 3-1=2*5
  const brands = await brandModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: brands.length, page: page, data: brands });
});
// get single brand
export const GetBrand = asynchandler(async (req: any, res: any, next: any) => {
  const { id } = req.params;
  const brand = await brandModel.findById(id);
  if (!brand) {
    return next(new ApiError({ msg: `No Brand for this id:${id}` }, 404));
  }
  res.status(200).json({ data: brand });
});

// create brand
export const CreateBrand = asynchandler(async (req: any, res: any) => {
  const name = req.body.name;
  const brand = await brandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ brand });
});

// update brand
export const UpdateBrand = asynchandler(
  async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const { name } = req.body;
    const brand = await brandModel.findOneAndUpdate(
      { _id: id },
      { name, slug: slugify(name) },
      { new: true },
    );
    if (!brand) {
      return next(new ApiError({ msg: `No Brand for this id:${id}` }, 404));
    }
    res.status(200).json({ data: brand });
  },
);
// delete brand
export const DeleteBrand = asynchandler(
  async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const brand = brandModel.findByIdAndDelete(id);
    if (!brand) {
      return next(new ApiError({ msg: `No Brand for this id:${id}` }, 404));
    }
    res.status(204).json({ msg: "done" });
  },
);
