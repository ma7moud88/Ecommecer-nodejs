import express from "express";
import {
  createSubCategoryValidator,
  getsubCategoryValidator,
  updatesubCategoryValidator,
  deletesubCategoryValidator,
} from "../utils/validators/subCategoryValidator.ts";
import {
  CreateSubCategory,
  GetsubCategories,
  GetsubCategory,
  UpdatesubCategory,
  DeletesubCategory,
} from "../Services/subCategoryServies.ts";

const router = express.Router();

router
  .route("/")
  .post(createSubCategoryValidator, CreateSubCategory)
  .get(GetsubCategories);
router
  .route("/:id")
  .get(getsubCategoryValidator, GetsubCategory)
  .put(updatesubCategoryValidator, UpdatesubCategory)
  .delete(deletesubCategoryValidator, DeletesubCategory);

export default router;
