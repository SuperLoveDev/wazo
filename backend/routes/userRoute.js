import express from "express";
import { loginUser, boutiqueUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", boutiqueUser);
userRouter.post("/login", loginUser);

export default userRouter;
