import slugify from "slugify";
import asynchandler from "express-async-handler";
import { productModel } from "../models/productMmodel.ts";
import ApiError from "../utils/apierror.ts";

// get all products
export const GetProducts = asynchandler(async (req: any, res: any) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 4;
  const skip = (page - 1) * limit; // 3-1=2*5
  const products = await productModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: products.length, page: page, data: products });
});
// get single product
export const GetProduct = asynchandler(
  async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return next(new ApiError({ msg: `No product for this id:${id}` }, 404));
    }
    res.status(200).json({ data: product });
  },
);

// create product
export const CreateProduct = asynchandler(async (req: any, res: any) => {
  req.body.slug = slugify(req.body.title);
  const product = await productModel.create(req.body);
  res.status(201).json({ product });
});

// update product
export const UpdateProduct = asynchandler(
  async (req: any, res: any, next: any) => {
    const { id } = req.params;
    req.body.slug = slugify(req.body.title);
    const product = await productModel.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!product) {
      return next(new ApiError({ msg: `No product for this id:${id}` }, 404));
    }
    res.status(200).json({ data: product });
  },
);
// delete product
export const DeleteProduct = asynchandler(
  async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const product = productModel.findByIdAndDelete(id);
    if (!product) {
      return next(new ApiError({ msg: `No Product for this id:${id}` }, 404));
    }
    res.status(204).json({ msg: "done" });
  },
);
