import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import adminController from "../controllers/adminController.js";
// import validate from "../middlewares/validateMiddleware.js";
// import { signupSchema, categorySchema } from "../validators/authValidator.js";

const router = express.Router();

// Parse JSON request bodies
router.use(express.json());

//admin auth route
router.get(
  "/admin-auth",
  authMiddleware,
  adminMiddleware,
  adminController.adminAuthcontroller
);

// Fetch user data by ID
router.get(
  "/get-user/:userId",
  authMiddleware,
  adminMiddleware,
  adminController.getUserById
);

// Update user data by ID (Partial Update)
router.patch(
  "/update-user/:userId",
  authMiddleware,
  adminMiddleware,
  adminController.updateUserById
);

export default router;

//
//
//

//
//
//

// // Define routes
// router.get(
//   "/users",
//   authMiddleware,
//   adminMiddlewar,
//   adminController.getAllUsers
// );
// // router.route("/users/add").post(authMiddleware, adminMiddlewar, adminController.addUser);
// router.post(
//   "/users/add",
//   authMiddleware,
//   adminMiddlewar,
//   validate(signupSchema),
//   adminController.addUser
// );
// router.delete(
//   "/users/:id",
//   authMiddleware,
//   adminMiddlewar,
//   adminController.getUserById
// );
// router.patch(
//   "/users/update/:id",
//   authMiddleware,
//   adminMiddlewar,
//   adminController.updateUserById
// );
// router.delete(
//   "/users/delete/:id",
//   authMiddleware,
//   adminMiddlewar,
//   adminController.deleteUserById
// );
