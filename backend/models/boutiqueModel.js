import mongoose from "mongoose";

const boutiqueSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    adresse: { type: String, required: true },
    whatsapp: { type: String, required: true, unique: true },
    motdepasse: { type: String, required: true },
    image: { type: String, required: true },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const Boutique = mongoose.model("Boutique", boutiqueSchema);

export default Boutique;
