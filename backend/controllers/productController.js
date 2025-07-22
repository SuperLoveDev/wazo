import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModels.js";

const addProduct = async (req, res) => {
  try {
    const { article, description, price, image } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const image5 = req.files.image5 && req.files.image5[0];
    const image6 = req.files.image6 && req.files.image6[0];

    const images = [image1, image2, image3, image4, image5, image6].filter(
      (img) => img !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (img) => {
        let result = await cloudinary.uploader.upload(img.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      article,
      description,
      price: Number(price),
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);
    const product = new Product(productData);
    await product.save();

    res.json({ success: true, message: "Produit Ajouté" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const listProduct = async () => {};

const productById = async () => {};

const updateProduct = async () => {};

const deleteProduct = async () => {};

export { addProduct, listProduct, productById, updateProduct, deleteProduct };
