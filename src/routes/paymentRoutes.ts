import express from "express";
import {
  getPaymentMethodsController,
  createPaymentMethodController,
  updatePaymentMethodController,
  deletePaymentMethodController,
} from "../controllers/paymentController";

const router = express.Router();

router.get("/", getPaymentMethodsController);
router.post("/", createPaymentMethodController);
router.put("/:id", updatePaymentMethodController);
router.delete("/:id", deletePaymentMethodController);

export default router;
