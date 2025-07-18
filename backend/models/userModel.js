import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  adresse: { type: String, required: true },
  whatsapp: { type: String, required: true },
  image: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
