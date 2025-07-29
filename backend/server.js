import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import boutiqueRouter from "./routes/boutiqueRoute.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import { getAllBoutiques } from "./controllers/boutiqueController.js";
import cartRouter from "./routes/cartRoute.js";

// APP CONFIGURATION
const app = express();
const port = process.env.PORT || 4000;

// MIDDLEWARES
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
connectDB();
connectCloudinary();

// API ENDPOINT
app.use("/api/user", userRouter);
app.use("/api/creerboutique", boutiqueRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("My app is fully working, Yeah !");
});

app.listen(port, () => console.log("Server is running on PORT:", +port));
