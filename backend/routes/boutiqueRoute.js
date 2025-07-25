import express from "express";
import {
  boutiqueTableau,
  boutiqueUser,
  getAllBoutiques,
  getBoutiqueById,
  loginBoutique,
} from "../controllers/boutiqueController.js";
import upload from "../middleware/multer.js";

const boutiqueRouter = express.Router();

boutiqueRouter.post("/create", upload.single("image"), boutiqueUser);
boutiqueRouter.get("/boutique", getAllBoutiques);
boutiqueRouter.get("/boutiques/:id", getBoutiqueById);
boutiqueRouter.post("/loginboutique", loginBoutique);
boutiqueRouter.post("/tableau", boutiqueTableau);

export default boutiqueRouter;
