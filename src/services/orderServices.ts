// services/orderService.ts
import { PrismaClient, Order } from "@prisma/client";

const prisma = new PrismaClient();

export async function getOrders(userId: number): Promise<Order[]> {
  return prisma.order.findMany({
    where: { userId },
    include: { items: true },
  });
}

export async function getOrderById(orderId: number): Promise<Order | null> {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });
}
