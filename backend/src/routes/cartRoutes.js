import express from "express";
import {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(protect);

router.post("/", addToCart);
router.get("/", getCart);
router.put("/:productId", updateCartQuantity);
router.delete("/:productId", removeFromCart);
router.delete("/", clearCart);

export default router;