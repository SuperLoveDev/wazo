import express from "express";
import {
  addProduct,
  listProduct,
  productById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import protect from "../middleware/boutiqueAuth.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  // protect,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
    { name: "image6", maxCount: 1 },
  ]),
  addProduct
);
productRouter.get("/product", protect, listProduct);
productRouter.get("/product", protect, productById);
productRouter.put("/product", protect, updateProduct);
productRouter.delete("/product", protect, deleteProduct);

export default productRouter;
