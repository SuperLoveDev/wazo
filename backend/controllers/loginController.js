import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const loginUser = async () => {
  try {
    const { numero, motdepasse } = req.body;
    const user = await User.findOne({ numero });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }
    const isMatch = await bycrypt.compare(motdepasse, user.motdepasse);
    if (!isMatch) {
      return res.json({ success: false, message: "Mot de passe incorrect" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

export default loginUser;
