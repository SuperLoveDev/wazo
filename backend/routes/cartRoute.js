import express from "express";
import {
  addToCart,
  deleteCart,
  getCart,
  updateCart,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.get("/:cartId", getCart);
cartRouter.post("/:cartId", addToCart);
cartRouter.put("/:cartId", updateCart);
cartRouter.delete("/:cartId/:productId", deleteCart);

export default cartRouter;
