import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      nom: String,
      prenom: String,
      numero: String,
      mail: String,
      pays: String,
      region: String,
      ville: String,
      adressedelivraison: String,
      codepostal: String,
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        prix: Number,
        quantity: Number,
        boutiqueId: { type: mongoose.Schema.Types.ObjectId, ref: "Boutique" },
      },
    ],
    subtotal: Number,
    livraison: Number,
    total: Number,
    paymentMethod: {
      type: String,
      enum: ["cinetpay", "carte", "livraison"],
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "paid",
        "failed",
        "awaiting_shipment",
        "shipped",
        "delivered",
      ],
      default: "pending",
    },
    billingAddress: {
      type: Object,
      required: true,
    },
    paymentReference: String, // Pour CinetPay/Stripe
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
