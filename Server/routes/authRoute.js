import express from "express";
import authControllers from "../controllers/authController.js";
import { signupSchema, loginSchema } from "../validators/authValidator.js";
import validate from "../middlewares/validateMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authControllers.home);

// router.post(
//   "/register",
//   validate(signupSchema),
//   authControllers.registerController
// );

router.post("/login", validate(loginSchema), authControllers.loginController);

// test router
router.get("/user-auth", authMiddleware, authControllers.usercontroller);

export default router;
