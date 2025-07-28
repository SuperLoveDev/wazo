import Boutique from "../models/boutiqueModel.js";
import { v2 as cloudinary } from "cloudinary";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Router creating a boutique
const boutiqueUser = async (req, res) => {
  try {
    const { name, description, category, adresse, whatsapp, motdepasse } =
      req.body;

    // verifying if the boutique user exit
    const exists = await Boutique.findOne({ whatsapp });
    if (exists) {
      return res.json({ success: false, message: "Utilisateur existant" });
    }

    // numero verification
    if (!validator.isNumeric(whatsapp)) {
      return res.json({ success: false, message: "Entrez un numéro valide" });
    }

    // image verification
    if (!req.file) {
      return res.json({ success: false, message: "Image requise." });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "boutiques" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const imageUrl = result.secure_url;

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(motdepasse, salt);

    // boutique creation
    const newBoutique = new Boutique({
      name,
      description,
      category,
      adresse,
      whatsapp,
      image: imageUrl,
      motdepasse: hashedPassword,
    });

    const savedBoutique = await newBoutique.save();

    const token = createToken(savedBoutique._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error("Erreur création boutique:", error);
    res.json({ success: false, msg: error.message });
  }
};

// get all boutique catalogue for catalog page
const getAllBoutiques = async (req, res) => {
  try {
    const boutiques = await Boutique.find().populate("products");
    res.status(200).json({ success: true, boutiques });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// get single boutique with populated products
const getBoutiqueById = async (req, res) => {
  try {
    const { id } = req.params;

    const boutique = await Boutique.findById(id).populate("products");

    console.log("ID reçu dans getBoutiqueById:", id);

    if (!boutique) {
      return res.status(404).json({
        success: false,
        message: "Boutique non trouvée",
      });
    }

    res.status(200).json({
      success: true,
      boutique,
    });
  } catch (error) {
    console.error("Erreur getBoutiqueById:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// boutiquelogin
const loginBoutique = async (req, res) => {
  try {
    const { whatsapp, motdepasse } = req.body;

    if (!whatsapp || !motdepasse) {
      return res.status(400).json({
        success: false,
        message: "WhatsApp et mot de passe requis",
      });
    }

    const boutique = await Boutique.findOne({ whatsapp }).select("+motdepasse");

    if (!boutique) {
      return res.status(404).json({
        success: false,
        message: "Boutique non trouvée",
      });
    }

    if (!boutique.motdepasse) {
      return res.status(400).json({
        success: false,
        message: "Compte non configuré correctement",
      });
    }

    const isMatch = await bcrypt.compare(motdepasse, boutique.motdepasse);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Mot de passe incorrect",
      });
    }

    const token = jwt.sign({ id: boutique._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      token,
      id: boutique._id,
    });
  } catch (error) {
    console.error("Erreur login:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
};

const boutiqueTableau = async (req, res) => {
  try {
    const { numero, motdepasse } = req.body;
    if (
      numero === process.env.ADMIN_NUMERO &&
      motdepasse === process.env.ADMIN_MOTDEPASSE
    ) {
      const payload = { numero, role: "admin" };

      // Optionally set expiration (e.g., 7 days)
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res
        .status(200)
        .json({ success: true, message: "Tableau verifié", token });
    } else {
      return res.status(400).json({ success: false, message: "Pas authorisé" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  boutiqueUser,
  getAllBoutiques,
  getBoutiqueById,
  loginBoutique,
  boutiqueTableau,
};
