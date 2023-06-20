import { Request, Response } from "express";
import { Address } from "@prisma/client";
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../services/addressService";

export const getAllAddresses = async (
  req: Request,
  res: Response
): Promise<Response<Address[]>> => {
  try {
    const addresses = await getAddresses();
    return res.json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return res.status(500).json({ error: "Unable to fetch addresses" });
  }
};

export const addAddress = async (
  req: Request,
  res: Response
): Promise<Response<Address>> => {
  const { userId, street, city, state, postalCode } = req.body;

  try {
    const address = await createAddress(
      userId,
      street,
      city,
      state,
      postalCode
    );
    return res.json(address);
  } catch (error) {
    console.error("Error creating address:", error);
    return res.status(500).json({ error: "Unable to create address" });
  }
};

export const updateAddressById = async (
  req: Request,
  res: Response
): Promise<Response<Address>> => {
  const { id } = req.params;
  const { street, city, state, postalCode } = req.body;

  try {
    const address = await updateAddress(
      parseInt(id),
      street,
      city,
      state,
      postalCode
    );
    return res.json(address);
  } catch (error) {
    console.error("Error updating address:", error);
    return res.status(500).json({ error: "Unable to update address" });
  }
};

export const deleteAddressById = async (
  req: Request,
  res: Response
): Promise<Response<void>> => {
  const { id } = req.params;

  try {
    await deleteAddress(parseInt(id));
    return res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting address:", error);
    return res.status(500).json({ error: "Unable to delete address" });
  }
};
