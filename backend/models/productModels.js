import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  article: { type: String, required: true },
  description: { type: Number, required: true },
  price: { type: String, required: true },
  image: [{ type: String, required: true }],
});

const Product = mongoose.model("Product", productSchema);

export default Product;
