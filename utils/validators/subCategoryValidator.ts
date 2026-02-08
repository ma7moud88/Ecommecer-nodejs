import { check, param } from "express-validator";
import { validatorMiddleware } from "../../MiddleWares/validatorMiddleware.ts";

// validation of single subCategory
export const getsubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID"),
  validatorMiddleware,
];

export const createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name"),
  check("category").notEmpty().isMongoId().withMessage("Invalid subCategory"),
  validatorMiddleware,
];

export const updatesubCategoryValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid category ID")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name"),
  check("name").notEmpty(),
  validatorMiddleware,
];

export const deletesubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID"),
  validatorMiddleware,
];
