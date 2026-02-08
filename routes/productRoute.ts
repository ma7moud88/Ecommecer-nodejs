import express from "express";
import {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} from "../utils/validators/productValidator.ts";

import {
  GetProducts,
  GetProduct,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} from "../Services/productServices.ts";

const router = express.Router();

router.route("/").get(GetProducts).post(createProductValidator, CreateProduct);
router
  .route("/:id")
  .get(getProductValidator, GetProduct)
  .put(updateProductValidator, UpdateProduct)
  .delete(deleteProductValidator, DeleteProduct);

export default router;
