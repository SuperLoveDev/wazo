import Boutique from "../models/boutiqueModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Router creating a boutique
const boutiqueUser = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      adresse,
      whatsapp,
      image,
      motdepasse,
    } = req.body;
    const exists = await Boutique.findOne({ whatsapp });
    if (exists) {
      return res.json({ success: false, message: "utilisateur existant" });
    }
    if (!validator.isNumeric(whatsapp)) {
      return res.json({ success: false, message: "Entrez un numero valide" });
    }

    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(motdepasse, salt);

    const newBoutique = new Boutique({
      name,
      description,
      category,
      adresse,
      whatsapp,
      image,
      motdepasse: hashedPassword,
    });

    const savedBoutique = await newBoutique.save();

    const token = createToken(savedBoutique._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error("numero invalide", error);
    res.json({ success: false, msg: error.message });
  }
};

// boutiquelogin
const loginBoutique = async () => {
  try {
    const { whatsapp, motdepasse } = req.body;
    const user = await Boutique.findOne({ whatsapp });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }
    const isMatch = await bcrypt.compare(motdepasse, user.motdepasse);

    if (!isMatch) {
      return res.json({ success: false, message: "Mot de passe incorrect" });
    }
    const token = jwt.sign({ id: boutique._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

export { boutiqueUser, loginBoutique };
