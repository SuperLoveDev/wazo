import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  article: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  boutique: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Boutique",
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
