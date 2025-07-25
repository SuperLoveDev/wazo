import jwt from "jsonwebtoken";

const tableauAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(401)
        .json({ succcess: false, message: "Non-autorisé, pas de compte" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (
      token_decode !==
      process.env.ADMIN_NUMERO + process.env.ADMIN_MOTDEPASSE
    ) {
      return res
        .status(401)
        .json({ succcess: false, message: "Non-autorisé, pas de compte" });
    }
    // next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "pas de compte" });
  }
};

export default tableauAuth;
