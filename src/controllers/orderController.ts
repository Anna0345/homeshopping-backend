// controllers/orderController.ts
import { Request, Response } from "express";
import * as orderService from "../services/orderServices";

export async function getOrders(req: Request, res: Response): Promise<void> {
  const { userId } = req.params;
  const orders = await orderService.getOrders(parseInt(userId, 10));
  res.json(orders);
}

export async function getOrderById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const order = await orderService.getOrderById(parseInt(id, 10));
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
}
