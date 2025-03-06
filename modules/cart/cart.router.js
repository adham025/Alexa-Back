import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./cart.endPoint.js";
import * as cartController from "./controller/cart.controller.js";
const router = Router();

router.get("/all", auth(endPoints.create), cartController.cart);

router.patch(
  "/update/:bikeId",
  auth(endPoints.create),
  cartController.updateCartQuantity
);
router.post("/add", auth(endPoints.create), cartController.createCart);
router.delete(
  "/remove/:bikeId",
  auth(endPoints.create),
  cartController.removeFromCart
);

export default router;
