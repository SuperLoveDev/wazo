import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModels.js";
import Boutique from "../models/boutiqueModel.js";
import streamifier from "streamifier";

// add product
const addProduct = async (req, res) => {
  try {
    const { boutiqueId, article, description, price } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Image requise",
      });
    }

    // Upload image to Cloudinary
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "products" },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req);

    // Create new product
    const productData = {
      article,
      description,
      price: Number(price),
      image: result.secure_url,
      boutique: boutiqueId,
    };

    const product = new Product(productData);
    const savedProduct = await product.save();

    // Update boutique with populated products
    const updatedBoutique = await Boutique.findByIdAndUpdate(
      boutiqueId,
      { $push: { products: savedProduct._id } },
      { new: true }
    ).populate("products");

    res.json({
      success: true,
      message: "Produit ajouté avec succès",
      product: savedProduct,
      boutique: updatedBoutique,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// listing product
const listProduct = async (req, res) => {
  try {
    const boutiqueId = req.params.boutiqueId;
    const products = await Product.find({ boutique: boutiqueId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// removing product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Produit non trouvé",
      });
    }

    await Boutique.updateMany(
      { products: productId },
      { $pull: { products: productId } }
    );

    res.status(200).json({
      success: true,
      message: "Produit supprimé avec succès",
      deletedId: deletedProduct._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get single or product by id
const productById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(req.params.id).populate(
      "boutique",
      "name"
    );
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

export { addProduct, productById, listProduct, updateProduct, deleteProduct };
