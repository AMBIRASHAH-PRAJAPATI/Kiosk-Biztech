import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import categoryController from "../controllers/categoryController.js";
import validate from "../middlewares/validateMiddleware.js";
import { categorySchema } from "../validators/authValidator.js";

const router = express.Router();

// Parse JSON request bodies
router.use(express.json());

// category

//Get All category
router.get("/get-category", categoryController.getCategories);

router.get(
  "/get-all-category",
  authMiddleware,
  adminMiddleware,
  categoryController.getAllcategory
);

//Single category
router.get("/single-category/:slug", categoryController.getSinglecategory);

//soft delete category
router.delete(
  "/softdelete-category/:id",
  authMiddleware,
  adminMiddleware,
  categoryController.deletecategory
);

// delete permanently category and product
router.delete(
  "/permanenetdelete-category/:id",
  authMiddleware,
  adminMiddleware,
  categoryController.CascadeDeletecategory
);

// create category
router.post(
  "/create-category",
  authMiddleware,
  adminMiddleware,
  validate(categorySchema),
  categoryController.createcategory
);

//update category
router.put(
  "/update-category/:id",
  authMiddleware,
  adminMiddleware,
  validate(categorySchema),
  categoryController.updatecategory
);

export default router;
