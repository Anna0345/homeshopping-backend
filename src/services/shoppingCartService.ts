import { PrismaClient, Cart, Item, Product } from "@prisma/client";

const prisma = new PrismaClient();

export const getCartById = async (cartId: number): Promise<Cart | null> => {
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  return cart;
};

export const addItemToCart = async (
  cartId: number,
  productId: number,
  quantity: number,
  price: number,
  image: string
): Promise<Cart | null> => {
  const existingItem = await prisma.item.findFirst({
    where: { cartId, productId },
  });
  if (existingItem) {
    await prisma.item.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + quantity,
        total: (existingItem.quantity + quantity) * price,
      },
    });
  } else {
    await prisma.item.create({
      data: {
        cart: { connect: { id: cartId } },
        product: { connect: { id: productId } },
        quantity,
        price,
        total: quantity * price,
        image,
      },
      include: { product: true },
    });
  }
  const updatedItem = await prisma.cart.findUnique({
    where: { id: cartId },
    include: { items: true },
  });
  return updatedItem;
};

export const removeItemFromCart = async (
  itemId: number,
  cartId: number
): Promise<void> => {
  const item = await prisma.item.findUnique({
    where: { id: itemId },
    include: { cart: true },
  });

  if (item) {
    console.log("Updating cart with id:", cartId);

    await prisma.item.delete({
      where: { id: itemId },
    });
  }
};

export const updateItemQuantity = async (
  itemId: number,
  quantity: number
): Promise<Item> => {
  const item = await prisma.item.findUnique({
    where: { id: itemId },
    include: { product: true },
  });

  if (!item) {
    throw new Error("Item not found");
  }

  const price = item.product.price;

  const updatedItem = await prisma.item.update({
    where: { id: itemId },
    data: {
      quantity,
      total: quantity * price,
    },
    include: { product: true },
  });

  return updatedItem;
};
