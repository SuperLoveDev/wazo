import express from "express";
import {
  boutiqueUser,
  loginBoutique,
} from "../controllers/boutiqueController.js";

const boutiqueRouter = express.Router();

boutiqueRouter.post("/create", boutiqueUser);
boutiqueRouter.post("/login", loginBoutique);

export default boutiqueRouter;
