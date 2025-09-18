// backend/models/Funcao.js (NOVO ARQUIVO)

import mongoose from "mongoose";
const { Schema } = mongoose;

const FuncaoSchema = new Schema({
  nome: { // Ex: "Soldador", "Motorista de Cargas Perigosas"
    type: String,
    required: true
  },
  descricao: {
    type: String
  },
  
  // Vínculo com a empresa cliente (cada cliente tem suas próprias funções)
  clienteId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // --- Listas de Requisitos (o coração da funcionalidade) ---

  // Lista de riscos associados a esta função
  riscos: [{
    type: Schema.Types.ObjectId,
    ref: 'Risco'
  }],
  
  // Lista de exames complementares obrigatórios para esta função
  examesRequeridos: [{
    type: Schema.Types.ObjectId,
    ref: 'Exame'
  }],
  
  // Lista de treinamentos obrigatórios para esta função
  treinamentosRequeridos: [{
    type: Schema.Types.ObjectId,
    ref: 'Treinamento'
  }]

}, { timestamps: true });

export default mongoose.model("Funcao", FuncaoSchema);