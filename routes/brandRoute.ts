import express from "express";
import {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} from "../utils/validators/brandValidator.ts";

import {
  GetBrand,
  GetBrands,
  CreateBrand,
  UpdateBrand,
  DeleteBrand,
} from "../Services/brandServices.ts";

const router = express.Router();

router.route("/").get(GetBrands).post(createBrandValidator, CreateBrand);
router
  .route("/:id")
  .get(getBrandValidator, GetBrand)
  .put(updateBrandValidator, UpdateBrand)
  .delete(deleteBrandValidator, DeleteBrand);

export default router;
