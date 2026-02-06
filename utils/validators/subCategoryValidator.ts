import { check, param } from "express-validator";
import { validatorMiddleware } from "../../MiddleWares/validatorMiddleware.ts";

// export const getCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid category ID"),
//   validatorMiddleware,
// ];

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

// export const updateCategoryValidator = [
//   check("id")
//     .isMongoId()
//     .withMessage("Invalid category ID")
//     .isLength({ min: 3 })
//     .withMessage("Too short category name")
//     .isLength({ max: 32 })
//     .withMessage("Too long category name"),
//   validatorMiddleware,
// ];

// export const deleteCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid category ID"),
//   validatorMiddleware,
// ];
