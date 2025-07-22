import express from "express";
import {
  boutiqueTableau,
  boutiqueUser,
  loginBoutique,
} from "../controllers/boutiqueController.js";

const boutiqueRouter = express.Router();

boutiqueRouter.post("/create", boutiqueUser);
boutiqueRouter.post("/login", loginBoutique);
boutiqueRouter.post("/tableau", boutiqueTableau);

export default boutiqueRouter;
