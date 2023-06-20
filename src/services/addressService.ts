import { PrismaClient, Address } from "@prisma/client";

const prisma = new PrismaClient();

export const getAddresses = async (): Promise<Address[]> => {
  const addresses = await prisma.address.findMany();
  return addresses;
};

export const createAddress = async (
  userId: number,
  street: string,
  city: string,
  state: string,
  postalCode: string
): Promise<Address> => {
  const address = await prisma.address.create({
    data: {
      userId,
      street,
      city,
      state,
      postalCode,
    },
  });
  return address;
};

export const updateAddress = async (
  id: number,
  street: string,
  city: string,
  state: string,
  postalCode: string
): Promise<Address> => {
  const address = await prisma.address.update({
    where: { id },
    data: {
      street,
      city,
      state,
      postalCode,
    },
  });
  return address;
};

export const deleteAddress = async (id: number): Promise<void> => {
  await prisma.address.delete({
    where: { id },
  });
};
