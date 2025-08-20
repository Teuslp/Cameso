import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  role: { type: String, enum: ["admin", "cliente"], default: "cliente" }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
