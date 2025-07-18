import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB connected.");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("❌ MongoDB disconnected.");
  });

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connection established.");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // quitte l'app si connexion échoue
  }
};

export default connectDB;
