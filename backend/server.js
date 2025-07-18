import express from "express";
import cors from "cors";
import "dotenv/config";
import conncetDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";

// APP CONFIGURATION
const app = express();
const port = process.env.PORT || 4000;

// MIDDLEWARES
app.use(express.json());
app.use(cors());
conncetDB();
connectCloudinary();

// API ENDPOINT
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("My app is fully working, Yeah !");
});

app.listen(port, () => console.log("Server is running on PORT:", +port));
