import { PrismaClient, Payment } from "@prisma/client";

const prisma = new PrismaClient();

export const getPaymentMethods = async (): Promise<Payment[]> => {
  const paymentMethods = await prisma.payment.findMany();
  return paymentMethods;
};

export const createPaymentMethod = async (
  userId: number,
  cardNumber: string,
  cardHolder: string,
  expMonth: string,
  expYear: string,
  cvv: string
): Promise<Payment> => {
  const paymentMethod = await prisma.payment.create({
    data: {
      userId,
      cardNumber,
      cardHolder,
      expMonth,
      expYear,
      cvv,
    },
  });
  return paymentMethod;
};

export const updatePaymentMethod = async (
  id: number,
  userId: number,
  cardNumber: string,
  cardHolder: string,
  expMonth: string,
  expYear: string,
  cvv: string
): Promise<Payment> => {
  const paymentMethod = await prisma.payment.update({
    where: { id },
    data: {
      userId,
      cardNumber,
      cardHolder,
      expMonth,
      expYear,
      cvv,
    },
  });
  return paymentMethod;
};

export const deletePaymentMethod = async (id: number): Promise<void> => {
  await prisma.payment.delete({
    where: { id },
  });
};
