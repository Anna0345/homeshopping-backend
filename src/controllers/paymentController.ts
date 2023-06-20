import { Request, Response } from "express";
import {
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  getPaymentMethods,
} from "../services/paymentService";

export const getPaymentMethodsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const paymentMethods = await getPaymentMethods();
    res.json(paymentMethods);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve payment methods" });
  }
};

export const createPaymentMethodController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, cardNumber, cardHolder, expMonth, expYear, cvv } =
      req.body as {
        userId: number;
        cardNumber: string;
        cardHolder: string;
        expMonth: string;
        expYear: string;
        cvv: string;
      };
    const paymentMethod = await createPaymentMethod(
      userId,
      cardNumber,
      cardHolder,
      expMonth,
      expYear,
      cvv
    );
    res.json(paymentMethod);
  } catch (error) {
    res.status(500).json({ message: "Failed to create payment method" });
  }
};

export const updatePaymentMethodController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { userId, cardNumber, cardHolder, expMonth, expYear, cvv } =
      req.body as {
        userId: number;
        cardNumber: string;
        cardHolder: string;
        expMonth: string;
        expYear: string;
        cvv: string;
      };
    const paymentMethod = await updatePaymentMethod(
      parseInt(id),
      userId,
      cardNumber,
      cardHolder,
      expMonth,
      expYear,
      cvv
    );
    res.json(paymentMethod);
  } catch (error) {
    res.status(500).json({ message: "Failed to update payment method" });
  }
};

export const deletePaymentMethodController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await deletePaymentMethod(parseInt(id));
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete payment method" });
  }
};
