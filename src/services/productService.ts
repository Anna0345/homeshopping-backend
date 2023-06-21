import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

export interface ProductInput {
  name: string;
  description?: string;
  price: number;
  inventory: number;
  categoryId: number;
  image: string;
}

export interface ProductUpdateInput {
  name?: string;
  description?: string;
  price?: number;
  inventory?: number;
  categoryId?: number;
  image: string;
}

export async function getProducts(
  page: number,
  limit: number
): Promise<Product[]> {
  const skip = (page - 1) * limit;
  return prisma.product.findMany({
    skip,
    take: limit,
  });
}

export async function getProductById(id: number): Promise<Product | null> {
  return prisma.product.findUnique({
    where: { id },
  });
}

export async function createProduct(
  data: ProductInput,
  userRole?: string // Make userRole parameter optional
): Promise<Product> {
  if (userRole && userRole !== "admin") {
    // Add a null check for userRole
    throw new Error("Unauthorized");
  }

  return prisma.product.create({
    data,
  });
}

export async function updateProduct(
  id: number,
  data: ProductUpdateInput,
  userRole?: string 
): Promise<Product | null> {
  if (userRole && userRole !== "admin") {
   
    throw new Error("Unauthorized");
  }

  return prisma.product.update({
    where: { id },
    data,
  });
}

export async function deleteProduct(
  id: number,
  userRole?: string // Make userRole parameter optional
): Promise<Product | null> {
  if (userRole && userRole !== "admin") {
    // Add a null check for userRole
    throw new Error("Unauthorized");
  }

  return prisma.product.delete({
    where: { id },
  });
}
