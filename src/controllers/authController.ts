import { Request, Response, NextFunction } from "express";
import {
  registerUser,
  loginUser,
  updateUserProfile,
  authenticateUser,
  deleteUser,
} from "../services/authService";
import { User } from "@prisma/client";
import { SessionData } from "express-session";

interface MySessionData extends SessionData {
  user: { id: number; role: string };
  userId: number;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "An error occurred";
}
declare module "express-session" {
  interface Session {
    token?: string;
  }
}

export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body;
  try {
    const user = await registerUser(username, email, password);
    res.json(user);
  } catch (error: unknown) {
    res.status(400).json({ message: getErrorMessage(error) });
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  try {
    console.log("Email:", email);
    console.log("Password:", password);

    const { user, token } = await loginUser(email, password);
    console.log("User:", user);
    console.log("Token:", token);
    const cart = user.carts[0].items;
    if (user && user.id) {
      (req.session as unknown as MySessionData).userId = user.id; // Type assertion
      console.log("User ID stored in session:", user.id);
    } else {
      console.error("User ID not found during login");
      throw new Error("User ID not found during login");
    }

    console.log("Session:", req.session);

    res.json({ user, token, cart });
    next();
  } catch (error) {
    console.error("Error during login:", error);
    res.status(401).json({ message: getErrorMessage(error) });
  }
}

export function logout(req: Request, res: Response) {
  delete req.session.token;
  // Clear the token from session storage
  res.json({ message: "Logout successful" });
}

export async function getUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    authenticateUser(req, res, next);
    const userId = (req.user as User)?.id; // Access the id property from req.user
    console.log("Authenticated user ID:", userId);
    res.json({ userId });
  } catch (error: unknown) {
    console.error("getUserProfile error:", error);
    res.status(401).json({ message: getErrorMessage(error) });
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    authenticateUser(req, res, next);
    const userId = (req.user as User)?.id; // Access the id property from req.user
    console.log("Authenticated user ID:", userId);
    const { username, email, ...additionalFields } = req.body;
    const updatedUser = await updateUserProfile(
      userId,
      username,
      email,
      additionalFields
    );
    res.json(updatedUser);
  } catch (error: unknown) {
    console.error("updateUser error:", error);
    res.status(400).json({ message: getErrorMessage(error) });
  }
}

export async function deleteUserProfile(req: Request, res: Response) {
  try {
    authenticateUser(req, res, async () => {
      const userId = (req.user as User)?.id;
      console.log("Authenticated user ID:", userId);
      await deleteUser(userId);
      res.json({ message: "User profile deleted" });
    });
  } catch (error: unknown) {
    console.error("deleteUserProfile error:", error);
    res.status(400).json({ message: getErrorMessage(error) });
  }
}

export function getSessionUserId(req: Request, res: Response) {
  const userId = req.session.id;
  if (userId) {
    res.json({ userId });
  } else {
    res.status(404).json({ message: "User ID not found in session" });
  }
}
