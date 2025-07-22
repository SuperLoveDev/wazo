import express from "express";
import {
  addProduct,
  listProduct,
  productById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
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
productRouter.get("/list", listProduct);
productRouter.post("/remove", deleteProduct);
productRouter.post("/productid", productById);
productRouter.put("/product/:productId", updateProduct);

export default productRouter;
