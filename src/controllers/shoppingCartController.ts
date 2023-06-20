import { Request, Response } from "express";
import {
  getCartById,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
} from "../services/shoppingCartService";
import { Cart, Item } from "@prisma/client";

export const getCart = async (
  req: Request,
  res: Response
): Promise<Response<Cart | null>> => {
  const { cartId } = req.params;

  try {
    const cart = await getCartById(Number(cartId));
    return res.json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to retrieve cart" });
  }
};

export const addItemToCartHandler = async (
  req: Request,
  res: Response
): Promise<Response<Item>> => {
  const { cartId, productId, quantity, price, image } = req.body;

  try {
    const item = await addItemToCart(cartId, productId, quantity, price, image);
    console.log(item);
    return res.json(item);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add item to cart" });
  }
};

export const removeItemFromCartHandler = async (
  req: Request,
  res: Response
): Promise<Response<void>> => {
  const { itemId, cartId } = req.params;

  try {
    await removeItemFromCart(Number(itemId), Number(cartId));
    return res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to remove item from cart" });
  }
};

export const updateItemQuantityHandler = async (
  req: Request,
  res: Response
): Promise<Response<Item>> => {
  const { itemId, quantity } = req.body;

  try {
    const updatedItem = await updateItemQuantity(itemId, quantity);
    return res.json(updatedItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update item quantity" });
  }
};
