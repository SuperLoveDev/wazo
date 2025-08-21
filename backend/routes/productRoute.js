import express from "express";
import {
  addProduct,
  listProduct,
  updateProduct,
  deleteProduct,
  productById,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import tableauAuth from "../middleware/boutiqueAuth.js";

const productRouter = express.Router();

productRouter.post("/add", upload.single("image"), addProduct);
productRouter.get("/:id", productById);
productRouter.get("/list/:boutiqueId", listProduct);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.put("/update", updateProduct);

export default productRouter;
