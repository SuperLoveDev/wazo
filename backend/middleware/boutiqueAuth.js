import jwt from "jsonwebtoken";
import Boutique from "../models/boutiqueModel.js";

const protect = async (req, res, next) => {
  let token =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split("")[1]
      : null;

  if (!token) {
    res
      .status(401)
      .json({ succcess: false, message: "Non-autorisé, pas de compte" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Boutique.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "pas de compte" });
  }
};

export default protect;
