// backend/models/Aso.js (NOVO ARQUIVO)

import mongoose from "mongoose";
const { Schema } = mongoose;

const AsoSchema = new Schema({
  // Vínculos essenciais
  clienteId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  colaboradorId: {
    type: Schema.Types.ObjectId,
    ref: 'Colaborador',
    required: true
  },

  // Dados específicos do ASO
  tipoExame: {
    type: String,
    enum: ['Admissional', 'Periódico', 'Demissional', 'Retorno ao Trabalho', 'Mudança de Risco'],
    required: true
  },
  resultado: {
    type: String,
    enum: ['Apto', 'Inapto'],
    required: true
  },
  dataExame: {
    type: Date,
    required: true
  },
  
  // O CAMPO MAIS IMPORTANTE PARA O DASHBOARD INTELIGENTE
  proximoExame: {
    type: Date,
    required: true // Essencial para os alertas de vencimento
  },

  // Vínculo opcional ao arquivo PDF do ASO
  documentoId: {
    type: Schema.Types.ObjectId,
    ref: 'Documento',
    required: false
  }

}, { timestamps: true });

export default mongoose.model("Aso", AsoSchema);