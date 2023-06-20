// routes/orderRoutes.ts
import express from "express";
import * as orderController from "../controllers/orderController";

const router = express.Router();

router.get("/:userId", orderController.getOrders);
router.get("/:id", orderController.getOrderById);

export default router;
