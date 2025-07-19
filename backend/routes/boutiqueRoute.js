import express from "express";
import boutiqueUser from "../controllers/boutiqueController.js";

const boutiqueRouter = express.Router();

boutiqueRouter.post("/create", boutiqueUser);

export default boutiqueRouter;
