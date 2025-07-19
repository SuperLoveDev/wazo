import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  numero: { type: String, unique: true, required: true },
  motdepasse: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
