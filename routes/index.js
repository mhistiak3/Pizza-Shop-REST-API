// dependencies
import express from "express";
import {
  registerController,
  loginController,
  userController,
  refreshController,
  productController,
} from "../controllers";
import auth from "../middleware/auth";

// Application Routes
const router = express.Router();

// HACK: Authentication routes
router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, userController.me);
router.post("/refresh", refreshController.refresh);
router.post("/logout", auth, loginController.logout);

// HACK: Products Routes
router.post("/products",productController.store);

export default router;
