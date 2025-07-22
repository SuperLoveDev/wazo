import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModels.js";

// add product
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

// listing product
const listProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// removing product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "produit supprimer" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// get single or product by id
const productById = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// update a product
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const { article, description, price } = req.body;
    const updateFields = {};

    if (article) updateFields.article = article;
    if (description) updateFields.description = description;
    if (price) updateFields.price = price;

    const updateItem = await Product.findByIdAndUpdate(
      productId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, updateItem });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, productById, updateProduct, deleteProduct };
