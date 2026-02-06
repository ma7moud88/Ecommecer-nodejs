import express from "express";
import { createSubCategoryValidator } from "../utils/validators/subCategoryValidator.ts";
import { CreateSubCategory } from "../Services/subCategoryServies.ts";

const router = express.Router();

router.route("/").post(createSubCategoryValidator, CreateSubCategory);
router.route("/:id");
//   .get(getCategoryValidator, GetCategory)
//   .put(updateCategoryValidator, UpdateCategory)
//   .delete(deleteCategoryValidator, DeleteCategory);

export default router;
