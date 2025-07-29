import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  cartId: { type: String, reqiuired: true },
  items: [
    {
      productId: { type: String, required: true },
      article: { type: String, required: true },
      prix: { type: Number, required: true },
      image: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
