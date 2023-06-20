import express from "express";
import {
  getCart,
  addItemToCartHandler,
  removeItemFromCartHandler,
  updateItemQuantityHandler,
} from "../controllers/shoppingCartController";
import { authenticateUser } from "../services/authService";

const router = express.Router();

// Get Cart by ID
router.get("/:cartId", authenticateUser, getCart);

// Add Item to Cart
router.post("/item", authenticateUser, addItemToCartHandler);

// Remove Item from Cart
router.delete("/:cartId/item/:itemId", removeItemFromCartHandler);

// Update Item Quantity
router.put("/item/:itemId", updateItemQuantityHandler);

export default router;
