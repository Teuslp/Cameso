import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  from: { type: String, required: true }, // "cliente" ou "admin"
  to: { type: String, required: true },   // id do destinatário
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Message", MessageSchema);
