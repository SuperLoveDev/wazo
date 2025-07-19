import User from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
const createUser = async (req, res) => {
  try {
    const { name, numero, motdepasse } = req.body;
    const exists = await User.findOne({ numero });

    //check existing user numero
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Numero deja utilisé" });
    }
    //Use of validator library for check-in
    if (!validator.isMobilePhone(numero, "any")) {
      return res.status(400).json({
        success: false,
        message: "Format de numéro invalide (ex: 0612345678)",
      });
    }
    if (motdepasse.length < 4) {
      return res.status(400).json({
        success: false,
        message:
          "Votre mot de passe est trop court (minimum 4 caractères requis)",
      });
    }

    //hashing password with bcrypt
    const salt = await bcrypt.genSalt(6);
    const hashedMotdepasse = await bcrypt.hash(motdepasse, salt);

    //creating new user
    const newUser = new User({ name, numero, motdepasse: hashedMotdepasse });
    // Store user in database
    const savedUser = await newUser.save();
    //providing token to user
    const token = createToken(savedUser._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la création de l'utilisateur",
    });
  }
};

export default createUser;
