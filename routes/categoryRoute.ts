import express from "express";
import {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} from "../utils/validators/categoryValidator.ts";

import {
  GetCategory,
  CreateCategory,
  GetCategories,
  UpdateCategory,
  DeleteCategory,
} from "../Services/categoryServices.ts";

const router = express.Router();

// router.get("/", getCategory);
// router.post("/api/category/", CreateCategory);

router
  .route("/")
  .get(GetCategories)
  .post(createCategoryValidator, CreateCategory);
router
  .route("/:id")
  .get(getCategoryValidator, GetCategory)
  .put(updateCategoryValidator, UpdateCategory)
  .delete(deleteCategoryValidator, DeleteCategory);

export default router;
