import { Request, Response } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  ProductInput,
  ProductUpdateInput,
} from "../services/productService";
import { User } from "@prisma/client";




export async function getProduct(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const product = await getProductById(Number(id));
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error in getProduct:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function listProducts(req: Request, res: Response): Promise<void> {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await getProducts(Number(page), Number(limit));
    res.json(products);
  } catch (error) {
    console.error("Error in listProducts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createProductHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { name, description, price, inventory, categoryId, image } =
      req.body as ProductInput;
    const { role } = req.user as User;

    console.log("req.user:", req.user);
    console.log("req.user.role:", role);

    if (role !== "admin") {
      console.error("Unauthorized access in createProductHandler");
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const product = await createProduct({
      name,
      description,
      price,
      inventory,
      categoryId,
      image,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error in createProductHandler:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateProductHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const { name, description, price, inventory, categoryId, image } =
      req.body as ProductUpdateInput;
    const { role } = req.user as User;

    console.log("req.user:", req.user);
    console.log("req.user.role:", role);

    if (role !== "admin") {
      console.error("Unauthorized access in updateProductHandler");
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const product = await updateProduct(Number(id), {
      name,
      description,
      price,
      inventory,
      categoryId,
      image,
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error in updateProductHandler:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteProductHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const { role } = req.user as User;

    console.log("req.user:", req.user);
    console.log("req.user.role:", role);

    if (role !== "admin") {
      console.error("Unauthorized access in deleteProductHandler");
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const product = await deleteProduct(Number(id));
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error in deleteProductHandler:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
