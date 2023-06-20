import express from "express";
import {
  register,
  login,
  logout,
  getUserProfile,
  updateUser,
  deleteUserProfile,
  getSessionUserId,
} from "../controllers/authController";
import { authenticateUser } from "../services/authService";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user", getUserProfile);
router.put("/user", updateUser);
router.delete("/user", deleteUserProfile);
router.get("/session/userId", getSessionUserId);

export default router;
