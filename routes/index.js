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
import admin from "../middleware/admin";

// Application Routes
const router = express.Router();

// HACK: Authentication routes
router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, userController.me);
router.post("/refresh", refreshController.refresh);
router.post("/logout", auth, loginController.logout);

// HACK: Products Routes
router.post("/products", [auth, admin], productController.store);
router.put("/products/:id", [auth, admin], productController.update);
router.delete("/products/:id", [auth, admin], productController.destroy);
router.get("/products",  productController.index);
router.get("/products/:id",  productController.show);

export default router;
