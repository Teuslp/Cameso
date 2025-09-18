import mongoose from "mongoose";
const { Schema } = mongoose;

const TreinamentoSchema = new Schema({
  nome: { // Ex: "NR-35 - Trabalho em Altura"
    type: String,
    required: true,
    unique: true
  },
  descricao: {
    type: String
  },
  validadeEmMeses: { // Ex: 24 (para 24 meses)
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Treinamento", TreinamentoSchema);