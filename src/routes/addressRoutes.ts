import express from "express";
import {
  getAllAddresses,
  addAddress,
  updateAddressById,
  deleteAddressById,
} from "../controllers/addressController";

const router = express.Router();

router.get("/", getAllAddresses);
router.post("/", addAddress);
router.put("/:id", updateAddressById);
router.delete("/:id", deleteAddressById);

export default router;
