import Boutique from "../models/boutiqueModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Router creating a boutique
const boutiqueUser = async (req, res) => {
  try {
    const { name, description, category, adresse, whatsapp, image } = req.body;
    const exists = await Boutique.findOne({ whatsapp });
    if (exists) {
      return res.json({ success: false, message: "utilisateur existant" });
    }
    if (!validator.isNumeric(whatsapp)) {
      return res.json({ success: false, message: "Entrez un numero valide" });
    }

    const newBoutique = new Boutique({
      name,
      description,
      category,
      adresse,
      whatsapp,
      image,
    });

    const savedBoutique = await newBoutique.save();

    const token = createToken(savedBoutique._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error("numero invalide", error);
    res.json({ success: false, msg: error.message });
  }
};

export default boutiqueUser;
