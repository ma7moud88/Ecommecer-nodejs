import express from "express";
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

router.route("/").get(GetCategories).post(CreateCategory);
router
  .route("/:id")
  .get(GetCategory)
  .put(UpdateCategory)
  .delete(DeleteCategory);

export default router;
