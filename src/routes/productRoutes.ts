// product.routes.ts
import { Router } from "express";
import {
  listProducts,
  getProduct,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../controllers/productController";
import { authenticateUser } from "../services/authService";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/create", authenticateUser, createProductHandler);
router.put("/update/:id", authenticateUser, updateProductHandler);
router.delete("/:id", authenticateUser, deleteProductHandler);

export default router;
