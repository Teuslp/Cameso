// backend/models/User.js

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true }, // Nome do contato na empresa cliente
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  role: { type: String, enum: ["admin", "cliente"], default: "cliente" },

  // --- CAMPOS ADICIONADOS ---
  razaoSocial: { type: String },
  cnpj: { type: String, unique: true, sparse: true }
  
}, { timestamps: true });

export default mongoose.model("User", UserSchema);