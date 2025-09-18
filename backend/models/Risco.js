// backend/models/Risco.js (NOVO ARQUIVO)

import mongoose from "mongoose";
const { Schema } = mongoose;

const RiscoSchema = new Schema({
  nome: { // Ex: "Ruído Contínuo ou Intermitente"
    type: String,
    required: true,
    unique: true
  },
  tipo: {
    type: String,
    enum: ['Físico', 'Químico', 'Biológico', 'Ergonômico', 'De Acidente'],
    required: true
  },
  descricao: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model("Risco", RiscoSchema);