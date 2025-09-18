// backend/models/Exame.js (NOVO ARQUIVO)

import mongoose from "mongoose";
const { Schema } = mongoose;

const ExameSchema = new Schema({
  nome: { // Ex: "Audiometria Tonal e Vocal"
    type: String,
    required: true,
    unique: true
  },
  descricao: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model("Exame", ExameSchema);