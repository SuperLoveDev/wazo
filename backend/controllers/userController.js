import User from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Route for login into dashboard
const loginUser = async (req, res) => {
  res.status(201).json({ msg: "api is perfectly working" });
};

//Router creating a boutique
const boutiqueUser = async (req, res) => {
  try {
    const { name, description, category, adresse, whatsapp, image } = req.body;
    const exists = await User.findOne({ whatsapp });
    if (exists) {
      return res.json({ success: false, message: "utilisateur existant" });
    }
    if (!validator.isNumeric(whatsapp)) {
      return res.json({ success: false, message: "Entrez un numero valide" });
    }

    const newUser = new User({
      name,
      description,
      category,
      adresse,
      whatsapp,
      image,
    });

    const savedUser = await newUser.save();

    const token = createToken(savedUser._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error("numero invalide", error);
    res.json({ success: false, msg: error.message });
  }
};

export { loginUser, boutiqueUser };
