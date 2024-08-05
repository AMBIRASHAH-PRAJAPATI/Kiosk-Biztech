import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import productController from "../controllers/productController.js";
// import formidable from "express-formidable";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/create-product",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  productController.createProduct
);

// get product by page
router.get("/get-products/:page", productController.getAllProducts);

router.get("/get-product/:slug", productController.getSingleProducts);

router.delete("/delete-product/:pid", productController.deleteProduct);

router.put(
  "/update-product/:pid",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  productController.updateProduct
);

// filter product withot paging use if need
router.post("/filter-products", productController.filterProducts);

// product coutn
router.get("/product-count", productController.productCount);

// product per page with filters
router.get("/product-list/:page", productController.productList);

// search product
router.get("/product-search/:keyword", productController.productSearch);

// Similar Product
router.get("/similar-product/:pid/:cid", productController.similarProduct);

// product by category with filters
router.get("/product-category/:slug", productController.productByCategory);

// Route for product count by category
router.get(
  "/product-count-by-category",
  productController.productCountByCategory
);

router.get("/latest-products", productController.getLatestProducts);

export default router;

// routes
// router.post(
//   "/create-product",
//   authMiddleware,
//   adminMiddleware,
//   formidable(),
//   productController.createProduct
// );
