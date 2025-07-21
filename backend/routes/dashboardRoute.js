import express from "express";
import protect from "../middleware/boutiqueAuth.js";
import Boutique from "../models/boutiqueModel.js";

const tableauRouter = express();

tableauRouter.get("/tableau", protect, async (req, res) => {
  try {
    const boutique = await Boutique.findById(req.user._id);
    res.status(201).json({ success: true, boutique });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default tableauRouter;
