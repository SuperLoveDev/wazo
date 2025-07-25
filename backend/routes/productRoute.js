import express from "express";
import {
  addProduct,
  listProduct,
  productById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import tableauAuth from "../middleware/boutiqueAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  tableauAuth,
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
productRouter.get("/list", tableauAuth, listProduct);
productRouter.post("/remove", tableauAuth, deleteProduct);
productRouter.post("/productid", tableauAuth, productById);
productRouter.put("/product/:productId", tableauAuth, updateProduct);

export default productRouter;
