import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const secretKey = process.env.SECRET_KEY || "";

import { SessionData } from "express-session";

interface MySessionData extends SessionData {
  cartId: number | undefined;
  user: { id: number; role: string };
  userId: number;
}

export async function registerUser(
  username: string,
  email: string,
  password: string
) {
  // Email validation using regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  // Password validation
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit."
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      role: "customer",
      carts: {
        create: {}, // Create an empty cart for the user
      },
    },
    include: { carts: true },
  });

  return user;
}

export async function loginUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
      include: {
        carts: {
          include: {
            items: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role, cartId: user.carts[0].id },
      secretKey,
      {
        expiresIn: "5h",
      }
    );

    // Return the user object with the updated role field and the token
    return { user: { ...user, role: user.role }, token };
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the "Authorization" header
  if (!token) {
    console.log("No token found");
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey) as {
      userId: number;
      role: string;
      cartId?: number; // Add the 'cartId' property to the token payload
    };
    console.log("Decoded token:", decodedToken);

    // Save user information in session
    const mySessionData = req.session as unknown as MySessionData;
    mySessionData.user = {
      id: decodedToken.userId,
      role: decodedToken.role,
    };
    mySessionData.userId = decodedToken.userId; // Set the 'userId' property
    console.log((mySessionData.cartId = decodedToken.cartId)); // Set the 'cartId' property from the decoded token

    if (!mySessionData.cartId) {
      // Handle the case where the 'cartId' is not present in the token
      // You can create a new cart here if desired
      throw new Error("User does not have a cart");
    }

    next();
  } catch (error: unknown) {
    console.error("Error decoding token:", error);
    if ((error as { name?: string }).name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    } else {
      return res.status(401).json({ error: "Invalid token" });
    }
  }
};

export async function updateUserProfile(
  userId: number,
  username: string,
  email: string,
  additionalFields: Partial<User>
) {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      username,
      email,
      ...additionalFields,
    },
  });
  return updatedUser;
}

export async function deleteUser(userId: number) {
  const existingUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!existingUser) {
    throw new Error("User not found"); // or handle the error as per your requirement
  }

  const deletedUser = await prisma.user.delete({ where: { id: userId } });
  return deletedUser;
}
