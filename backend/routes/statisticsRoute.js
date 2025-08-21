import express from "express";
import { getBoutiqueStatistics } from "../controllers/statisticsController.js";

const router = express.Router();

router.get("/:boutiqueId", getBoutiqueStatistics);

export default router;
